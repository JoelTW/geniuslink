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
let pageRatingModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: parseInt(obj['@count']),
            date: modelHelper.getDate(obj['@date']),
            seatedCount: parseInt(obj['@seated.count']),
            unseatedCount: parseInt(obj['@unseated.count'])
        };
        if('@score' in obj && obj['@score'] !== '') {
            parsed.score = parseInt(obj['@score']);
        }
        if('@seated.score' in obj && obj['@seated.score'] !== '') {
            parsed.seatedScore = parseInt(obj['@seated.score']);
        }
        if('@unseated.score' in obj && obj['@unseated.score'] !== '') {
            parsed.unseatedScore = parseInt(obj['@unseated.score']);
        }
        if('@score.trend' in obj) {
            parsed.scoreTrend = parseInt(obj['@score.trend']);
        }
        if('@seated.score.trend' in obj) {
            parsed.seatedScoreTrend = parseInt(obj['@seated.score.trend']);
        }
        if('@unseated.score.trend' in obj) {
            parsed.unseatedScoreTrend = parseInt(obj['@unseated.score.trend']);
        }
        if('user.ratedby' in obj) {
            let ratedBy = obj['user.ratedby'];
            parsed.userRatedBy = {
                id: parseInt(ratedBy['@id']),
                score: parseInt(ratedBy['@score']),
                date: modelHelper.getDate(ratedBy['@date']),
                href: ratedBy['@href'],
                seated: modelHelper.getBool(ratedBy['@seated'])
            };
        }
        return parsed;
    }
};
export default pageRatingModel;
