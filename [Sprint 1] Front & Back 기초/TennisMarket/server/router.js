function route(pathname, handle, res, productId) {
  if (typeof handle[pathname] === "function") {
    handle[pathname](res, productId);
  } else if (pathname.includes("/img")) {
    handle["/img"](res, pathname);
  } else {
    handle["/404"](res);
  }
}

exports.route = route;
