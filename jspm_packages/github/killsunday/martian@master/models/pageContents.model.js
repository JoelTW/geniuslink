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
let pageContentsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            type: obj['@type'],
            title: obj['@title']
        };
        if(Array.isArray(obj.body)) {
            parsed.body = obj.body[0];
            parsed.targets = pageContentsModel._getTargets(obj.body);
        } else {
            parsed.body = obj.body;
        }
        modelHelper.addIfDefined(obj.tail, 'tail', parsed);
        return parsed;
    },
    _getTargets(body) {
        let targets = [];
        if(body.length > 1) {
            for(let i = 1; i < body.length; i++) {
                targets.push({
                    [ body[i]['@target'] ]: body[i]['#text']
                });
            }
        }
        return targets;
    }
};
export default pageContentsModel;
