const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userController = require("./controllers/UserController");
const foodTypeController = require("./controllers/FoodTypeController");
const foodSizeController = require("./controllers/FoodSizeController");
const tasteController = require("./controllers/TasteController");
const foodController = require("./controllers/FoodController");
const { execArgv } = require("process");
const saleTempController = require("./controllers/SaleTempController");

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("./uploads"));

app.get("/api", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
});

//
//
//sale Temp

app.post("/api/saleTemp/updateFoodSize", (req, res) =>
  saleTempController.updateFoodSize(req, res)
);
app.get("/api/saleTemp/listSaleTempDetail/:saleTempId", (req, res) =>
  saleTempController.listSaleTempDetail(req, res)
);
app.post("/api/saleTemp/createDetail", (req, res) =>
  saleTempController.createDatail(req, res)
);
app.put("/api/saleTemp/changeQty", (req, res) => {
  saleTempController.changeQty(req, res);
});
app.delete("/api/saleTemp/remove/:foodId/:userId", (req, res) => {
  saleTempController.remove(req, res);
});
app.delete("/api/saleTemp/clear/:userId", (req, res) =>
  saleTempController.clear(req, res)
);
app.get("/api/saleTemp/list/:userId", (req, res) =>
  saleTempController.list(req, res)
);
app.post("/api/saleTemp/create", (req, res) =>
  saleTempController.create(req, res)
);
//
//
//food///////
app.get("/api/food/filter/:foodType", (req, res) =>
  foodController.filter(req, res)
);
app.put("/api/food/update", (req, res) => foodController.update(req, res));
app.delete("/api/food/remove/:id", (req, res) =>
  foodController.remove(req, res)
);
app.get("/api/food/list", (req, res) => {
  foodController.list(req, res);
});
app.post("/api/food/upload", (req, res) => foodController.upload(req, res));
app.post("/api/food/create", (req, res) => foodController.create(req, res));
//
//
//food Type

app.put("/api/foodType/update", (req, res) =>
  foodTypeController.update(req, res)
);
app.delete("/api/foodType/remove/:id", (req, res) =>
  foodTypeController.remove(req, res)
);
app.post("/api/foodType/create", (req, res) =>
  foodTypeController.create(req, res)
);
app.post("/api/user/signIn", (req, res) => userController.signin(req, res));
app.get("/api/foodType/list", (req, res) => foodTypeController.list(req, res));

//
//
///food Size
app.get("/api/foodSize/filter/:foodTypeId", (req, res) => {
  foodSizeController.filter(req, res);
});
app.post("/api/foodSize/create", (req, res) =>
  foodSizeController.create(req, res)
);
app.get("/api/foodSize/list", (req, res) => foodSizeController.list(req, res));
app.delete("/api/foodSize/remove/:id", (req, res) =>
  foodSizeController.remove(req, res)
);
app.put("/api/foodSize/update", (req, res) => {
  foodSizeController.update(req, res);
});

//
//
// Taste
app.get("/api/taste/listByFoodTypeId/:foodTypeId", (req, res) =>
  tasteController.listByFoodTypeId(req, res)
);
app.post("/api/taste/create", (req, res) => {
  tasteController.create(req, res);
});
app.get("/api/taste/list", (req, res) => {
  tasteController.list(req, res);
});
app.delete("/api/taste/remove/:id", (req, res) => {
  tasteController.remove(req, res);
});
app.put("/api/taste/update", (req, res) => {
  tasteController.update(req, res);
});

app.listen(3000, () => {
  console.log("API Server Running...");
});
