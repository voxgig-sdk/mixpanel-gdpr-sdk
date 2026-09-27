
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


describe('CheckDeletionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_GDPR_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_GDPR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelGdprSDK.test()
    const ent = testsdk.CheckDeletion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"compliance_type":{"a":true,"h":"Compliance Type","n":"compliance_type","r":true,"sh":"GDPR or CCPA","t":"`$STRING`","key$":"compliance_type","index$":0},"date_requested":{"a":true,"h":"Date Requested","n":"date_requested","r":true,"sh":"The timestamp when the deletion job was requested","t":"`$STRING`","key$":"date_requested","index$":1},"distinct_ids":{"a":true,"h":"Distinct Ids","n":"distinct_ids","r":true,"t":"`$ARRAY`","key$":"distinct_ids","index$":2},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"sh":"The id of the project this job is for","t":"`$NUMBER`","key$":"project_id","index$":3},"requesting_user":{"a":true,"h":"Requesting User","n":"requesting_user","r":true,"sh":"The user that created the deletion job request","t":"`$STRING`","key$":"requesting_user","index$":4},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"The status of the job.","t":"`$STRING`","key$":"status","index$":5},"tracking_id":{"a":true,"h":"Tracking Id","n":"tracking_id","r":true,"sh":"The tracking id of the deletion job","t":"`$STRING`","key$":"tracking_id","index$":6}},"name":"check_deletion","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /data-deletions/v3.0/{tracking_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"tracking_id","or":"tracking_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/data-deletions/v3.0/{tracking_id}","q":{"exist":["token","tracking_id"]},"r":{},"s":[{"lit":"data-deletions"},{"lit":"v3.0"},{"var":"tracking_id"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"check_deletion","name__orig":"check_deletion","Name":"CheckDeletion","name_":"check_deletion","name-":"check-deletion","NAME":"CHECK_DELETION","index$":1}, {"active":true,"entity":"check_deletion","key$":"BasicCheckDeletionFlow","kind":"basic","name":"BasicCheckDeletionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"check_deletion_ref01","srcdatavar":"check_deletion_ref01_data","suffix":"_dt0"},"m":{"id":"check_deletion01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-check_deletion_ref01"}}],"index$":0}]}, 'CheckDeletion', {"GET /data-deletions/v3.0/{tracking_id}":{"protocol":"http","parameters":[{"name":"tracking_id","in":"path","schema":{"type":"string"},"description":"The task ID shown in the response","required":true,"x-ref":"#/components/parameters/TrackingId","index$":0},{"name":"token","in":"query","schema":{"type":"string"},"description":"Your project token","required":true,"x-ref":"#/components/parameters/ProjectToken","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let check_deletion_ref01_data = Object.values(setup.data.existing.check_deletion)[0]

    // LOAD
    const check_deletion_ref01_ent = client.CheckDeletion()
    const check_deletion_ref01_match_dt0 = {}
    const check_deletion_ref01_data_dt0 = (await check_deletion_ref01_ent.load(check_deletion_ref01_match_dt0)).data()
    assert(null != check_deletion_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/check_deletion/CheckDeletionTestData.json')

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
    ['check_deletion01','check_deletion02','check_deletion03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_GDPR_TEST_CHECK_DELETION_ENTID': idmap,
    'MIXPANEL_GDPR_TEST_LIVE': 'FALSE',
    'MIXPANEL_GDPR_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_GDPR_APIKEY': '',
    'MIXPANEL_GDPR_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_GDPR_TEST_CHECK_DELETION_ENTID']

  const live = 'TRUE' === env.MIXPANEL_GDPR_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_GDPR_TEST_CHECK_DELETION_ENTID']
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
  
