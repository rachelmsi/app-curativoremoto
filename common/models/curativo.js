'use strict';

module.exports = function(Curativo) {
  Curativo.beforeRemote('create', function(context, user, next) {
    context.args.data.usuarioId = context.req.accessToken.userId;
    next();
  });
};