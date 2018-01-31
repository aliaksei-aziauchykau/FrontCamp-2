import { Component } from "../../../../../core/decorators/component.decorator";
import BaseComponent from "../../../../base.component";
import { ActionType } from "../../../../../reducers/action-type";
import { EditorMode } from "../../../../../core/enums/editor-mode.enum";

@Component({
    selector: "fc-archive-table",
    template: require("./archive-table.component.html"),
    styles: require("./archive-table.component.scss"),
    children: []
})
export default class ArchiveTableComponent extends BaseComponent {
    constructor() {
        super();
    }
    
    initializeParamsHook() {
        this.articles = this.config.params.articles;
        this.selected = this.config.params.selected;
        this.mode = this.config.params.mode;
    }

    defineDomElementsHook() {
        let domElements = {
            rows: this.config.ref.querySelectorAll("tbody tr"),
            body: this.config.ref.querySelector("tbody"),
        };
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.bindEvent(this.domElements.body, "click", (event) => {
            let finded = this.articles.find(article => article._id === event.target.parentNode.id);
            this.selected = this.selected &&  this.selected._id === finded._id ? null : finded;
            this.dispatch(this.selected);
        });
    }

    dispatch(selected) {
        if(!selected) {
            this.config.store.dispatch({ 
                type: ActionType.SetArchiveEditorMode,
                payload: EditorMode.None
            });
        }
        this.config.store.dispatch({ 
            type: ActionType.SelectArticle,
            payload: selected
        });
    }

    isEnabled() {
        let result = this.mode === EditorMode.None || this.mode === EditorMode.Delete;
        return result; 
    }
}