#!/usr/bin/env node

var http = require('https'),
    args = process.argv,
    os = require('os'),
    fs = require('fs'),
    product = (args[2]),
    ver = (args[3]),
    sys = (os.platform()),
    dirPath = `download`;

var arch = process.arch;
if (arch == "x64") {
    arch = "amd64";
}

// Create directory if directory does not exist.
fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) console.log(`Error creating directory: ${err}`)
    // Directory now exists.
})

var request = http.get("https://releases.hashicorp.com/" + product + "/" + ver + "/" + product + "_" + ver + "_" + sys + "_" + arch + ".zip", function (response) {
    if (response.statusCode === 200) {
        var file = fs.createWriteStream("download/" + product + "_" + ver + "_" + sys + "_" + arch + ".zip");
        response.pipe(file);
    }
    // Add timeout.
    request.setTimeout(12000, function () {
        request.abort();
    });
});

