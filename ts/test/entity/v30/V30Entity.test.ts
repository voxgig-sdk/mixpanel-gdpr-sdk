

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"compliance_type","req":false,"short":"Select CCPA or GDPR.","type":"`$STRING`","index$":0},{"active":true,"name":"disclosure_type","req":false,"short":"Only required if compliance_type = CCPA.","type":"`$STRING`","index$":1},{"active":true,"name":"distinct_ids","req":false,"type":"`$ARRAY`","index$":2}],"name":"v30","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"token","orig":"token","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /data-deletions/v3.0","json":"{\"operationId\":\"create-deletion\",\"parameters\":[{\"description\":\"Your project token\",\"in\":\"query\",\"name\":\"token\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"compliance_type\":{\"description\":\"Select CCPA or GDPR. Default is GDPR.\",\"type\":\"string\"},\"distinct_ids\":{\"example\":[\"distinct_id_1\",\"distinct_id_2\",\"distinct_id_3\"],\"items\":{\"description\":\"Distinct IDs involved in the request\",\"type\":\"string\"},\"type\":\"array\"}}}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"description\":\"A JSON response object containing the task_id of the retrieval/deletion job.\",\"properties\":{\"results\":{\"properties\":{\"task_id\":{\"description\":\"The task_id of the retrieval/deletion job.\",\"example\":\"job-tracking-id\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"The status of the response\",\"example\":\"ok\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"JobCreated\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"OAuthToken\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/data-deletions/v3.0","segments":[{"lit":"data-deletions"},{"lit":"v3.0"}],"select":{"exist":["token"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"token","orig":"token","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /data-retrievals/v3.0","json":"{\"operationId\":\"create-retrieval\",\"parameters\":[{\"description\":\"Your project token\",\"in\":\"query\",\"name\":\"token\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"compliance_type\":{\"description\":\"Select CCPA or GDPR. Default is GDPR.\",\"type\":\"string\"},\"disclosure_type\":{\"description\":\"Only required if compliance_type = CCPA. Can be Data, Categories, or Sources. Default is Data.\",\"type\":\"string\"},\"distinct_ids\":{\"example\":[\"distinct_id_1\",\"distinct_id_2\",\"distinct_id_3\"],\"items\":{\"description\":\"Distinct IDs involved in the request\",\"type\":\"string\"},\"type\":\"array\"}}}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"description\":\"A JSON response object containing the task_id of the retrieval/deletion job.\",\"properties\":{\"results\":{\"properties\":{\"task_id\":{\"description\":\"The task_id of the retrieval/deletion job.\",\"example\":\"job-tracking-id\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"The status of the response\",\"example\":\"ok\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"JobCreated\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"OAuthToken\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/data-retrievals/v3.0","segments":[{"lit":"data-retrievals"},{"lit":"v3.0"}],"select":{"exist":["token"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"v30","name__orig":"v30","Name":"V30","name_":"v30","name-":"v30","NAME":"V30","index$":3}, {"active":true,"entity":"v30","key$":"BasicV30Flow","kind":"basic","name":"BasicV30Flow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"v30_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'V30')
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
  
