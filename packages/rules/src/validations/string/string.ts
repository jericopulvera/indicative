/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable } from 'indicative-utils'
import { casts } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { RulesConfig } from '../../Contracts'

/**
 * Ensures the value is a string.
 *
 * Validation fails when value isn't a string or cannot be casted
 * to a string value
 *
 * [casts]
 *  [from label="number"]
 *  [to label="string"]
 * [/casts]
 *
 * [casts]
 *  [from label="boolean"]
 *  [to label="string"]
 * [/casts]
 *
 * [casts]
 *  [from label="array"]
 *  [to label="string"]
 * [/casts]
 *
 * [casts]
 *  [from label="date"]
 *  [to label="string"]
 * [/casts]
 *
 * [source, js]
 * ----
 * const rules = {
 *   bio: 'string'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('bio', 'string')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    const castedValue = casts.toString(fieldValue)
    if (castedValue === null) {
      return false
    }

    data[field] = castedValue
    return true
  },
}

export { validation as default }
