"use strict";

// const functions = require('firebase-functions');
var express = require('express');

var cors = require('cors');

var app = express();

require('dotenv').config();

var PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
  console.log('Server is running on PORT:', PORT);
});

var bodyParser = require('body-parser');

var axios = require('axios');

app.use(cors());
app.use(bodyParser.json({
  limit: '500mb'
}));
app.use(bodyParser.urlencoded({
  limit: "500mb",
  extended: true,
  parameterLimit: 50000
})); ///////////////////////////////////////////////////////////////////////////////////////////

var MongoClient = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;

var db_url = process.env.DB_URL;
app.get('/', function (req, res) {
  res.status(200).send('testing api12');
});
var settings = {};
MongoClient.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function _callee11(err, client) {
  var db, UserController, user_controller, ScrapController, scrapController;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (!err) {
            _context11.next = 3;
            break;
          }

          console.error(err);
          return _context11.abrupt("return");

        case 3:
          db = client.db(process.env.DB_NAME || "stock_db");
          console.log('connected db');
          UserController = require('./Controller/UserController');
          user_controller = new UserController(db);
          ScrapController = require('./Controller/ScrapController');
          scrapController = new ScrapController(db);
          app.post("/signup", function _callee(req, res) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.t0 = res;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(user_controller.SignUp(req));

                  case 3:
                    _context.t1 = _context.sent;

                    _context.t0.send.call(_context.t0, _context.t1);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          app.post("/signin", function _callee2(req, res) {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.t0 = res;
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(user_controller.SignIn(req));

                  case 3:
                    _context2.t1 = _context2.sent;

                    _context2.t0.send.call(_context2.t0, _context2.t1);

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });
          app.post("/CheckLogin", function _callee3(req, res) {
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.t0 = res;
                    _context3.next = 3;
                    return regeneratorRuntime.awrap(user_controller.CheckLogin(req.body));

                  case 3:
                    _context3.t1 = _context3.sent;

                    _context3.t0.send.call(_context3.t0, _context3.t1);

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });
          app.post("/companies/read", function _callee4(req, res) {
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.t0 = res;
                    _context4.next = 3;
                    return regeneratorRuntime.awrap(scrapController.ReadCompanies(req.body));

                  case 3:
                    _context4.t1 = _context4.sent;

                    _context4.t0.send.call(_context4.t0, _context4.t1);

                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });
          app.post("/companies/getAnalysis", function _callee5(req, res) {
            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.t0 = res;
                    _context5.next = 3;
                    return regeneratorRuntime.awrap(scrapController.GetAnalysis(req.body));

                  case 3:
                    _context5.t1 = _context5.sent;

                    _context5.t0.send.call(_context5.t0, _context5.t1);

                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });
          app.post("/companies/GetAnalysisByDate", function _callee6(req, res) {
            return regeneratorRuntime.async(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.t0 = res;
                    _context6.next = 3;
                    return regeneratorRuntime.awrap(scrapController.GetAnalysisByDate(req.body.company_id));

                  case 3:
                    _context6.t1 = _context6.sent;

                    _context6.t0.send.call(_context6.t0, _context6.t1);

                  case 5:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });
          app.post("/UpdateTotal", function _callee7(req, res) {
            return regeneratorRuntime.async(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    _context7.next = 3;
                    return regeneratorRuntime.awrap(scrapController.UpdateTotal());

                  case 3:
                    res.send("SUCCESS");
                    _context7.next = 9;
                    break;

                  case 6:
                    _context7.prev = 6;
                    _context7.t0 = _context7["catch"](0);
                    res.send("FAILED");

                  case 9:
                  case "end":
                    return _context7.stop();
                }
              }
            }, null, null, [[0, 6]]);
          });
          app.post("/CronTest", function _callee8(req, res) {
            return regeneratorRuntime.async(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    console.log("------- Cron-Test -------");
                    res.send("SUCCESS");

                  case 2:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          });
          app.post("/TestCalcData", function _callee9(req, res) {
            return regeneratorRuntime.async(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.prev = 0;
                    _context9.next = 3;
                    return regeneratorRuntime.awrap(scrapController.CalculateData());

                  case 3:
                    res.send("SUCCESS");
                    _context9.next = 9;
                    break;

                  case 6:
                    _context9.prev = 6;
                    _context9.t0 = _context9["catch"](0);
                    res.send("FAILED");

                  case 9:
                  case "end":
                    return _context9.stop();
                }
              }
            }, null, null, [[0, 6]]);
          });
          app.post("/CronTest", function _callee10(req, res) {
            return regeneratorRuntime.async(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    console.log("------- Cron-Test -------");
                    res.send("SUCCESS");

                  case 2:
                  case "end":
                    return _context10.stop();
                }
              }
            });
          });

        case 19:
        case "end":
          return _context11.stop();
      }
    }
  });
});