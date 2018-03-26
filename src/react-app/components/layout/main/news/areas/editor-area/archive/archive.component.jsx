import React from "react";
import { ApiInvokerService } from "../../../../../../../../core/api";
import { Endpoints } from "../../../../../../../../core/endpoints";
import { TemplateHelpers } from "../../../../../../../../core/helpers/templates/template.helper";
import { articlesFetching } from "../../../../../../../redux/modules/archive";
import { connect } from "react-redux"
import { ArchiveFilter } from "./archive-filter/archive-filter.component";

import { RegexStoreService } from "../../../../../../../../core/services/regex-store.service";
import { ArchivePanel } from "./archive-panel/archive-panel.component";
import { EditorMode } from "../../../../../../../../core/enums/editor-mode.enum";
import { ArchiveEditor } from "./archive-editor/archive-editor.component";
import  { ArchiveTable } from "./archive-table/archive-table.component";

import "./archive.component.scss";
class ArchivePresentor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(articlesFetching(
            ApiInvokerService
                .invokeGet(Endpoints.Articles())
                .then(data => TemplateHelpers.getInstance().formatArticles(data.articles))
        ));
    }

    display() {
        const table = (
            <div>
                <ArchivePanel />
                <ArchiveFilter />
                <ArchiveTable articles={this.props.articles} filter={this.props.filter} />
            </div>
        );
        const editor = (
            <div>
                <ArchivePanel />
                <ArchiveEditor />
            </div>
        );

        const result = this.props.mode === EditorMode.Add
            ? editor
            : table
        return result;
    }

    isMode(mode) {
        return this.props.mode === mode;
    }


    render() {
        return (
            <div class="archive--position">
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-4">
                            {this.isMode(EditorMode.None) ? <ArchiveFilter/> : null}
                        </div>
                        <div class="col-1">
                            <ArchivePanel />
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    {
                                        this.isMode(EditorMode.None) 
                                        ? <ArchiveTable articles={this.props.articles} filter={this.props.filter} />
                                        : <ArchiveEditor article={this.isMode(EditorMode.Edit) ? this.props.selected : null} /> 
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export const Archive = connect(
    (state) => ({
        mode: state.archiveState.editorMode,
        articles: RegexStoreService.i().filterArticlesByTitle(state.archiveState.articles, state.archiveState.filter),
        filter: state.archiveState.filter,
        selected: state.archiveState.selected
    })
)(ArchivePresentor);