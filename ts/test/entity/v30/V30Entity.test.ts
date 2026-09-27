

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MixpanelGdprSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('V30Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_GDPR_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_GDPR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelGdprSDK.test()
    const ent = testsdk.V30()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_GDPR_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v30.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"compliance_type":{"a":true,"h":"Compliance Type","n":"compliance_type","r":false,"sh":"Select CCPA or GDPR.","t":"`$STRING`","key$":"compliance_type","index$":0},"disclosure_type":{"a":true,"h":"Disclosure Type","n":"disclosure_type","r":false,"sh":"Only required if compliance_type = CCPA.","t":"`$STRING`","key$":"disclosure_type","index$":1},"distinct_ids":{"a":true,"h":"Distinct Ids","n":"distinct_ids","r":false,"t":"`$ARRAY`","key$":"distinct_ids","index$":2}},"name":"v30","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /data-deletions/v3.0","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/data-deletions/v3.0","q":{"exist":["token"]},"r":{},"s":[{"lit":"data-deletions"},{"lit":"v3.0"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"a":true,"co":{"id":"POST /data-retrievals/v3.0","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/data-retrievals/v3.0","q":{"exist":["token"]},"r":{},"s":[{"lit":"data-retrievals"},{"lit":"v3.0"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"v30","name__orig":"v30","Name":"V30","name_":"v30","name-":"v30","NAME":"V30","index$":3}, {"active":true,"entity":"v30","key$":"BasicV30Flow","kind":"basic","name":"BasicV30Flow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"v30_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'V30', {"POST /data-deletions/v3.0":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"distinct_ids":{"type":"array","items":{"type":"string","description":"Distinct IDs involved in the request"},"example":["distinct_id_1","distinct_id_2","distinct_id_3"],"x-ref":"#/components/schemas/DistinctIds","key$":"distinct_ids"},"compliance_type":{"type":"string","description":"Select CCPA or GDPR. Default is GDPR.","x-ref":"#/components/schemas/ComplianceType","key$":"compliance_type"}},"index$":1}}}},"parameters":[{"name":"token","in":"query","schema":{"type":"string"},"description":"Your project token","required":true,"x-ref":"#/components/parameters/ProjectToken","index$":0}]},"POST /data-retrievals/v3.0":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"distinct_ids":{"type":"array","items":{"type":"string","description":"Distinct IDs involved in the request"},"example":["distinct_id_1","distinct_id_2","distinct_id_3"],"x-ref":"#/components/schemas/DistinctIds","key$":"distinct_ids"},"compliance_type":{"type":"string","description":"Select CCPA or GDPR. Default is GDPR.","x-ref":"#/components/schemas/ComplianceType","key$":"compliance_type"},"disclosure_type":{"type":"string","description":"Only required if compliance_type = CCPA. Can be Data, Categories, or Sources. Default is Data.","x-ref":"#/components/schemas/DisclosureType","key$":"disclosure_type"}},"index$":1}}}},"parameters":[{"name":"token","in":"query","schema":{"type":"string"},"description":"Your project token","required":true,"x-ref":"#/components/parameters/ProjectToken","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const v30_ref01_ent = client.V30()
    let v30_ref01_data = setup.data.new.v30['v30_ref01']

    v30_ref01_data = (await v30_ref01_ent.create(v30_ref01_data)).data()
    assert(null != v30_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v30/V30TestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MixpanelGdprSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['v3001','v3002','v3003'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_GDPR_TEST_V30_ENTID': idmap,
    'MIXPANEL_GDPR_TEST_LIVE': 'FALSE',
    'MIXPANEL_GDPR_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_GDPR_APIKEY': '',
    'MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_GDPR_TEST_V30_ENTID']

  const live = 'TRUE' === env.MIXPANEL_GDPR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_GDPR_TEST_V30_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MixpanelGdprSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MIXPANEL_GDPR_APIKEY,
        server: {
          regionAndDomain: env.MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MIXPANEL_GDPR_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
