---
title: Interfacing With EMU-2 Energy Monitor
date: 2024-12-28 00:13:00-08:00
taxonomies:
  tags:
  - technology
  categories:
  - work+play
  type: [article]
extra:
---
The power utility here uses smart meters, and only a few approved devices can interface with them. Most require cloud access, which I wanted to avoid, so I had only one option: the [EMU-2][emu] by Rainforest Automation.

The EMU-2 is a simple device with a display listing a set of pre-set data view options. It has a micro USB port for power and communication, and a battery for backup. Fortunately, the USB also acts as a serial device, and is able to stream the electric meter data. In addition to the [product page][emu], Rainforest Automation has a [GitHub][emu-git] repository with the device’s data sheets, sample code, and a basic API.

I was looking for a minimal solution and didn’t want to use a mini computer for interfacing with the monitor. I tried using an ESP8266 with a Trinket M0, but that solution wasn’t fast enough to handle running USB host and serial USB communication. In the end, I chose an ESP32-S3, a dual-core board with two USB ports and support for USB host.

To handle the data from the meter, I initially tried using an XML parser, but I soon realized that the XML data over the serial interface wasn’t valid XML and could start or stop abruptly. So, I ended up writing a [simple tag parser][data-parser], which parses the stream of data and exposes structured data.

Next, I needed to configure the ESP32-S3 to act as a USB host, interface with the meter, and feed the data to my parser. Getting the USB CDC-ACM host driver running was relatively straightforward, with great examples available on the [Espressif GitHub repository][cdc-acm]. However, the challenge was that the EMU-2 monitor wasn’t being recognized as a serial device correctly. Oh, the joys of USB serial devices! A [quick patch][patch] was required to add support for the USB serial device signature used by the EMU-2 monitor, and everything worked smoothly.

Finally, I chose ESPHome to run on the microcontroller. I was already familiar with it, it’s simple to set up,  and easy to add custom components. I created a [custom component][esphome-emu2] that interfaces the [EMU-2 data parser][data-parser] and exposes metrics as sensors. And voilà, electric meter data is freed. An example ESPHome configuration is included in its repository.

I encountered a slight issue with the EMU-2 monitor reliability when running simultaneously on USB power and battery. To avoid dealing with batteries, I opted to power the ESP32-S3 via the first/programming USB port from a small UPS. In turn, the EMU-2 monitor is powered from the ESP-S3.

[emu]: https://www.rainforestautomation.com/rfa-z105-2-emu-2-2/
[emu-git]: https://github.com/rainforestautomation/Emu-Serial-API
[data-parser]: https://github.com/mayo/emu2-data-parser
[cdc-acm]: https://github.com/espressif/esp-idf/tree/master/examples/peripherals/usb/host/cdc/cdc_acm_host
[patch]: https://github.com/espressif/idf-extra-components/commit/5e8b554904298e9d3a7060cab7a15513a08bebaf
[esphome-emu2]: https://github.com/mayo/esphome_emu2_meter
