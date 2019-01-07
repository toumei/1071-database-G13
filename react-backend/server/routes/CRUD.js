const epilogue = require("epilogue");
const Boarder = require("../models/boarder");
const Account = require("../models/account");
const Account_role = require("../models/account_role");
const Role = require("../models/role");
const Malfunction = require("../models/malfunction");
const Processing = require("../models/processing");
const Apply = require("../models/apply");
const Switch = require("../models/switch");
const Sweep = require("../models/sweep");
const Cabinet = require("../models/cabinet");
const Vendor = require("../models/vendor");
const Bed = require("../models/bed");
const Time = require("../models/time");
const Coloption = require("../models/coloption");

const boarder = epilogue.resource({
  model: Boarder,
  endpoints: ["/api/boarder", "/api/boarder/:id"]
});

const account = epilogue.resource({
  model: Account,
  endpoints: ["/api/account", "/api/account/:id"]
});

const role = epilogue.resource({
  model: Role,
  endpoints: ["/api/role", "/api/role/:id"]
});

const account_role = epilogue.resource({
  model: Account_role,
  endpoints: ["/api/account_role", "/api/account_role/:id"]
});

const malfunction = epilogue.resource({
  model: Malfunction,
  endpoints: ["/api/malfunction", "/api/malfunction/:id"]
});

const processing = epilogue.resource({
  model: Processing,
  endpoints: ["/api/processing", "/api/processing/:id"]
});

const apply = epilogue.resource({
  model: Apply,
  endpoints: ["/api/apply", "/api/apply/:id"]
});

const net_switch = epilogue.resource({
  model: Switch,
  endpoints: ["/api/switch", "/api/switch/:id"]
});

const sweep = epilogue.resource({
  model: Sweep,
  endpoints: ["/api/sweep", "/api/sweep/:id"]
});

const cabinet = epilogue.resource({
  model: Cabinet,
  endpoints: ["/api/cabinet", "/api/cabinet/:id"]
});

const vendor = epilogue.resource({
  model: Vendor,
  endpoints: ["/api/vendor", "/api/vendor/:id"]
});

const bed = epilogue.resource({
  model: Bed,
  endpoints: ["/api/bed", "/api/bed/:id"]
});

const time = epilogue.resource({
  model: Time,
  endpoints: ["/api/time", "/api/time/:id"]
});

const coloption = epilogue.resource({
  model: Coloption,
  endpoints: ["/api/coloption", "/api/coloption/:id"]
});
