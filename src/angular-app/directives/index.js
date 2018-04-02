module.exports = function(ngModule) {
    require("./article-shower/article-shower.js")(ngModule);
    require("./article-editor/article-editor.js")(ngModule);
    require("./brand-bar/brand-bar.js")(ngModule);
    require("./footer/footer.js")(ngModule);
    require("./todo-list/todo-list.js")(ngModule);
    require("./todo-item/todo-item.js")(ngModule);
    require("./pages/todos/todo-page.js")(ngModule);
    require("./pages/todos/edit-todo-page/edit-todo-page.js")(ngModule);
    require("./forms/title/title-form.js")(ngModule);
    require("./common/alert/alert.js")(ngModule);
}