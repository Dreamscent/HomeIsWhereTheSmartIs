const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = [{
    // Since a lot of TuYa devices use the same modelID, but use different datapoints
    // it's necessary to provide a fingerprint instead of a zigbeeModel
    fingerprint: [
        {modelID: 'TS0601', manufacturerName: '_TZE200_txrzy8hs'},
    ],
    model: 'TS0601',
    vendor: 'TuYa',
    description: 'Curtain Motor',
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime, // Add this if you are getting no converter for 'commandMcuSyncTime'
    configure: tuya.configureMagicPacket,
    exposes: [
        exposes.text('work_state', ea.STATE),
        e.cover_position().setAccess('position', ea.STATE_SET),
        e.battery(),
        exposes.enum('opening_mode', ea.STATE_SET, ['tilt', 'lift']).withDescription('Opening mode'),
        exposes.enum('motor_direction', ea.STATE_SET, ['left', 'right']).withDescription('Motor side'),
        exposes.enum('set_upper_limit', ea.STATE_SET, ['start', 'stop']).withDescription('Learning'),
        exposes.enum('factory_reset', ea.STATE_SET, ['SET']).withDescription('Remove limits'),
    ],
    meta: {
        // All datapoints go in here
        tuyaDatapoints: [
            [1, 'state', tuya.valueConverterBasic.lookup({'OPEN': tuya.enum(0), 'STOP': tuya.enum(1), 'CLOSE': tuya.enum(2)})],
            [2, 'position', tuya.valueConverter.coverPosition],
            [3, 'position', tuya.valueConverter.raw],
            [4, 'opening_mode', tuya.valueConverterBasic.lookup({'tilt': tuya.enum(0), 'lift': tuya.enum(1)})],
            [7, 'work_state', tuya.valueConverterBasic.lookup({'standby': tuya.enum(0), 'success': tuya.enum(1), 'learning': tuya.enum(2)})],
            [13, 'battery', tuya.valueConverter.raw],
            [101, 'motor_direction', tuya.valueConverterBasic.lookup({'left': tuya.enum(0), 'right': tuya.enum(1)})],
            [102, 'set_upper_limit', tuya.valueConverterBasic.lookup({'start': tuya.enum(1), 'stop': tuya.enum(0)})],
            [107, 'factory_reset', tuya.valueConverter.setLimit],
        ],
    },
},
{
    // Since a lot of TuYa devices use the same modelID, but use different datapoints
    // it's necessary to provide a fingerprint instead of a zigbeeModel
    fingerprint: [
        {modelID: 'TS0601', manufacturerName: '_TZE200_guvc7pdy'},
    ],
    model: 'TS0601',
    vendor: 'TuYa',
    description: 'Curtain Motor',
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime, // Add this if you are getting no converter for 'commandMcuSyncTime'
    configure: tuya.configureMagicPacket,
    exposes: [
        exposes.text('work_state', ea.STATE),
        e.cover_position().setAccess('position', ea.STATE_SET),
        e.battery(),
        exposes.enum('opening_mode', ea.STATE_SET, ['tilt', 'lift']).withDescription('Opening mode'),
        exposes.enum('motor_direction', ea.STATE_SET, ['left', 'right']).withDescription('Motor side'),
        exposes.enum('set_upper_limit', ea.STATE_SET, ['start', 'stop']).withDescription('Learning'),
        exposes.enum('factory_reset', ea.STATE_SET, ['SET']).withDescription('Remove limits'),
    ],
    meta: {
        // All datapoints go in here
        tuyaDatapoints: [
            [1, 'state', tuya.valueConverterBasic.lookup({'CLOSE': tuya.enum(0), 'STOP': tuya.enum(1), 'OPEN': tuya.enum(2)})],
            [2, 'position', tuya.valueConverter.coverPosition],
            [3, 'position', tuya.valueConverter.raw],
            [4, 'opening_mode', tuya.valueConverterBasic.lookup({'tilt': tuya.enum(0), 'lift': tuya.enum(1)})],
            [7, 'work_state', tuya.valueConverterBasic.lookup({'standby': tuya.enum(0), 'success': tuya.enum(1), 'learning': tuya.enum(2)})],
            [13, 'battery', tuya.valueConverter.raw],
            [101, 'motor_direction', tuya.valueConverterBasic.lookup({'left': tuya.enum(0), 'right': tuya.enum(1)})],
            [102, 'set_upper_limit', tuya.valueConverterBasic.lookup({'start': tuya.enum(1), 'stop': tuya.enum(0)})],
            [107, 'factory_reset', tuya.valueConverter.setLimit],
        ],
    },
}
]

module.exports = definition;
