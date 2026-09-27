
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { MixpanelGdprSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('CheckRetrievalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_GDPR_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_GDPR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelGdprSDK.test()
    const ent = testsdk.CheckRetrieval()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"distinct_ids":{"a":true,"h":"Distinct Ids","n":"distinct_ids","r":false,"t":"`$ARRAY`","key$":"distinct_ids","index$":0},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"Link to the export if retrieval job is completed.","t":"`$STRING`","key$":"results","index$":1},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The status of the job.","t":"`$STRING`","key$":"status","index$":2}},"name":"check_retrieval","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /data-retrievals/v3.0/{tracking_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"tracking_id","or":"tracking_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/data-retrievals/v3.0/{tracking_id}","q":{"exist":["token","tracking_id"]},"r":{},"s":[{"lit":"data-retrievals"},{"lit":"v3.0"},{"var":"tracking_id"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"check_retrieval","name__orig":"check_retrieval","Name":"CheckRetrieval","name_":"check_retrieval","name-":"check-retrieval","NAME":"CHECK_RETRIEVAL","index$":2}, {"active":true,"entity":"check_retrieval","key$":"BasicCheckRetrievalFlow","kind":"basic","name":"BasicCheckRetrievalFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"check_retrieval_ref01","srcdatavar":"check_retrieval_ref01_data","suffix":"_dt0"},"m":{"id":"check_retrieval01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-check_retrieval_ref01"}}],"index$":0}]}, 'CheckRetrieval', {"GET /data-retrievals/v3.0/{tracking_id}":{"protocol":"http","parameters":[{"name":"tracking_id","in":"path","schema":{"type":"string"},"description":"The task ID shown in the response","required":true,"x-ref":"#/components/parameters/TrackingId","index$":0},{"name":"token","in":"query","schema":{"type":"string"},"description":"Your project token","required":true,"x-ref":"#/components/parameters/ProjectToken","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let check_retrieval_ref01_data = Object.values(setup.data.existing.check_retrieval)[0]

    // LOAD
    const check_retrieval_ref01_ent = client.CheckRetrieval()
    const check_retrieval_ref01_match_dt0 = {}
    const check_retrieval_ref01_data_dt0 = (await check_retrieval_ref01_ent.load(check_retrieval_ref01_match_dt0)).data()
    assert(null != check_retrieval_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/check_retrieval/CheckRetrievalTestData.json')

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
    ['check_retrieval01','check_retrieval02','check_retrieval03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_GDPR_TEST_CHECK_RETRIEVAL_ENTID': idmap,
    'MIXPANEL_GDPR_TEST_LIVE': 'FALSE',
    'MIXPANEL_GDPR_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_GDPR_APIKEY': '',
    'MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_GDPR_TEST_CHECK_RETRIEVAL_ENTID']

  const live = 'TRUE' === env.MIXPANEL_GDPR_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_GDPR_TEST_CHECK_RETRIEVAL_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
