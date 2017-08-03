(function () {
'use strict';

jn.angular.page({
    url: '/doc/dir',
    params: [
        'bnNo',
        'modelId',
        'contTyp',
        'custNo',
        'select',
    ],
    controller: [
        '$scope',
        'jnPage',
        'jnHelper',
        'jnDoc',
        function (
            $scope,
            jnPage,
            jnHelper,
            jnDoc
        ) {
            var tree, currentNode;

            var path = function (node) {
                var p = [node.text];
                var pNode = node.parent;

                while (pNode && pNode.text) {
                    p.unshift(pNode.text);
                    pNode = pNode.parent;
                }

                return p;
            };

            var changeNode = function (node) {
                if (node) {
                    currentNode = node;

                    if (node.parent) {
                        $scope.list = [{
                            text: '..',
                            children: node.parent.children,
                            parent: node.parent.parent,
                        }].concat(node.children);

                    } else {
                        $scope.list = node.children;
                    }

                } else {
                    changeNode(currentNode);
                }
            };

            var searchNode = (function () {
                var search = function (node, keyword, match) {
                    node.children.forEach(function (e) {
                        if (-1 < e.text.toLowerCase().indexOf(keyword)) {
                            match.push(e);
                        }

                        if (e.children) {
                            search(e, keyword, match);
                        }
                    });

                    return match;
                };

                return function (keyword) {
                    keyword = keyword.toLowerCase();
                    $scope.list = search(currentNode, keyword, []);
                    $scope.list.forEach(function (e) {
                        e.path = path(e);
                    });
                };
            })();

            jnDoc.readDirTree({
                bnNo: jnPage.params.bnNo,
                modelId: jnPage.params.modelId,
            }).then(function (dirTree) {
                tree = dirTree;
                changeNode(tree);
            });

            $scope.onClickNode = function (node) {
                if (node.children) {
                    changeNode(node);

                } else {
                    jnPage.back({
                        dirId: node.id,
                        modelNo: tree.model,
                        path: path(node),
                    });
                }
            };

            $scope.search = (function () {
                return function (keyword) {
                    if (0 < keyword.length) {
                        $scope.searching = true;
                        searchNode(keyword);

                    } else {
                        $scope.searching = false;
                        changeNode();
                    }
                };
            })();
        }
    ]
});
})();

