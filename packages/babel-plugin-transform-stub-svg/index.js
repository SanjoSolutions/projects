module.exports = function (babel) {
  const { types: t } = babel

  return {
    name: "ast-transform",
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.endsWith(".svg")) {
          path.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(path.node.specifiers[0].local.name),
                t.arrowFunctionExpression([], t.nullLiteral())
              ),
            ])
          )
        }
      },
    },
  }
}
