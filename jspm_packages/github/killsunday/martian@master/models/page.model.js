/**
 * MindTouch Core JS API
 * Copyright (C) 2006-2015 MindTouch, Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import modelHelper from './modelHelper';
import pageRatingModel from './pageRating.model';
let pageModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            id: parseInt(obj['@id']),
            deleted: modelHelper.getBool(obj['@deleted']),
            dateCreated: modelHelper.getDate(obj['date.created']),
            language: obj.language,
            namespace: obj.namespace,
            path: modelHelper.getString(obj.path),
            title: obj.title,
            uriUi: obj['uri.ui']
        };
        modelHelper.addIfDefined(obj['@href'], 'href', parsed);
        modelHelper.addIfDefined(obj['@revision'], 'revision', parsed);
        modelHelper.addIfDefined(obj.article, 'article', parsed);
        if('page.parent' in obj) {
            parsed.pageParent = pageModel._getParents(obj['page.parent'] || null);
        }
        if('rating' in obj) {
            parsed.rating = pageRatingModel.parse(obj.rating);
        }

        // Only parse subpages if the property exists, and it has a 'page'
        //  sub-property.
        if('subpages' in obj && typeof obj.subpages !== 'string' && 'page' in obj.subpages) {
            parsed.subpages = pageModel._getSubpages(obj.subpages);
        }
        return parsed;
    },
    _getParents(parent) {
        if(parent === null) {
            return null;
        } else {
            return pageModel.parse(parent);
        }
    },
    _getSubpages(subpages) {
        let pageDef = subpages.page;
        let parsed = [];
        pageDef = Array.isArray(pageDef) ? pageDef : [ pageDef ];
        pageDef.forEach((sp) => {
            parsed.push(pageModel.parse(sp));
        });
        return parsed;
    }
};
export default pageModel;
