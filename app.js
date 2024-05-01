const express = require("express");
const app = express();
const dbConnect = require("./db/dbConnect");
dbConnect();

const Order = require("./db/models/orderModel")
const Item = require("./db/models/itemModel")


// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// // app.get("/", (request, response, next) => {
// //   response.json({ message: "Hey! This is your server response!" });
// //   next();
// // });

// app.use("/api/auth", userRoutes)

// free endpoint


app.post("/recommend", (request, response) => {
  userId = request.query.userId;

  //make call to MongoDB to fetch the last order of the user 
 
  Order.find({userID : userId}).sort({_id:-1}).limit(1)
  .then( async (order)=>{
    if (order.length === 0){
      return response.status(201).send({
        message: "No history",
      });
    }
    else{
      console.log(order[0])
      items = []
      restId = order[0]["restID"]
      order[0]["items"].forEach(element => {
        item_name = element["orderid"]
        concat_str = restId + "|||" + item_name
        items.push(concat_str)
      });
        
        console.log(items)

        temp3 = await ( async (items)=>{
          temp2 = []
          for(const item of items){
            
            const spawn = require("child_process").spawn;
            const pythonProcess = spawn('python',["predict.py", item, 3]);
            
            temp = await pythonProcess.stdout.on('data', async (data) => {
              // get the item from the "||| ... "
              data = data.toString()
              // resolve(JSON.stringify(eval(data)))
              const temp = []
              for(const item of eval(data) ){
                
                data = await Item.findOne({resId : item.split("|||")[0], name : item.split("|||")[1]})
                console.log(data["id"])
                temp.push(data["id"])
        
              }
  
              console.log("h1", temp)
              return temp
              });
              temp2 = temp2.concat(temp)
  
            }
            console.log("h2", temp2)
            return temp2
  
        })
        
        return response.status(200).send(
          JSON.stringify(temp3)
        )




      }
    })
 
});

// authentication endpoint
// app.get("/auth-endpoint", auth, (request, response) => {
//   response.send({ message: "You are authorized to access me" });
// });

module.exports = app;
