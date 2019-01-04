module.exports = {
  path: "config",
  defaultRole: "user",
  baseUrl: "/api",
  decodedObjectName: "user",
  denyCallback: res => {
    return res.status(403).json({
      status: "Access Denied",
      success: false,
      message: "You are not authorized to access this resource"
    });
  }
};
