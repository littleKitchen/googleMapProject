const express = require('express');
const bodyParser = require('body-parser')
const graphiql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const addressName = require("./addressName.js");
const geometry = require("./geometry.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const schema = buildSchema(`
    type Geometry {
        type: String
        features: Query
    }
    type Address {
        id:Int
        value: String
        latlng: [Float]
        geometry: Geometry
    }
    type Query {
        list(name: String!): Address!
    }
`);

const root = {
    list: (args) => {
        var name = args.name;
        var addressNameList = [];
        addressName.forEach(item => {
            if (item.value.toLowerCase().indexOf(name.toLowerCase()) == 0) {
                geometry.features.forEach(itm => {
                    if (itm.properties.name.toLowerCase() == item.value.toLowerCase()) {
                        item.geometry = {
                            type: geometry.type,
                            features: [itm]
                        }
                    };
                });
                addressNameList.push(item);
            };
        });
        return { data: addressNameList };
    }
}

app.use('/graphql', graphiql.graphqlHTTP((req) => {
    return {
        schema: schema,
        rootValue: root,
        graphiql: true
    }
}));

app.post("/getNameSchema", function (req, res) {
    const list = root.list(req.body);
    console.log(list);
    res.json(list);
});

app.listen(3300, function () {
    console.log(`GraphQL server runing at http://localhost:3300/graphql/`)
});
