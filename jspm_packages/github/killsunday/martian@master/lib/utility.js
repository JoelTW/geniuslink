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

import stringUtility from './stringUtility';
let utility = {
    searchEscape: function(query) {
        let result = query.toString();
        let charArr = [ '\\', '+', '-', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':' ];
        charArr.forEach((c) => {
            let regex = new RegExp('\\' + c, 'g');
            result = result.replace(regex, '\\' + c);
        });
        return result;
    },
    getStringParams: function(queryString) {
        let retVal = {};
        let params = stringUtility.words(stringUtility.stringRight(queryString, '?'), '&');
        params.forEach((pair) => {
            let myPair = pair.split('=');
            if(myPair[0]) {
                retVal[decodeURIComponent(myPair[0])] = decodeURIComponent(myPair[1]);
            }
        });
        return retVal;
    },
    buildQueryString: function(paramObject) {
        let queryString = '';
        Object.keys(paramObject).forEach((key, index, arr) => {
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(paramObject[key]);
            if(index < arr.length - 1) {
                queryString += '&';
            }
        });
        return queryString;
    }
};
export default utility;
