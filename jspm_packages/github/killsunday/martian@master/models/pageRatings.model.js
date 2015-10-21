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
import pageModel from './page.model';
let pageRatingsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: parseInt(obj['@count']),
            href: obj['@href']
        };
        if('page' in obj) {
            parsed.page = [];
            let pageArray = Array.isArray(obj.page) ? obj.page : [ obj.page ];
            pageArray.forEach((page) => {
                parsed.page.push(pageModel.parse(page));
            });
        }
        return parsed;
    }
}
export default pageRatingsModel;
