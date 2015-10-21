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

import utility from './utility';
import stringUtility from './stringUtility';
export default class UriHash {
    constructor(hashStr) {
        if(stringUtility.startsWith(hashStr, '#')) {
            hashStr = hashStr.substr(1);
        }
        this._hashStr = hashStr || '';
        this._params = utility.getStringParams(hashStr);
    }
    getQueryParams() {
        return this._params;
    }
    replaceParams(paramObject) {
        return new UriHash(utility.buildQueryString(paramObject));
    }
    withParam(key, val) {
        var newParams = this._params;
        newParams[key] = val;
        return this.replaceParams(newParams);
    }
    withoutParam(key) {
        var newParams = this._params;
        delete newParams[key];
        return this.replaceParams(newParams);
    }
    getParam(key) {
        return this._params[key];
    }
    toHashString() {
        return '#' + this._hashStr;
    }
}
