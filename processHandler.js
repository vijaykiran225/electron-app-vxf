const child_process = require('child_process');
const { Notification } = require('electron')


function mvnCleanInstallSkipTest(event, params) {

    const workerProcess = child_process.spawn('mvn', ['clean', 'install', '-DskipTests'], {
        cwd: params.path
    });
    workerProcess.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    workerProcess.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    workerProcess.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });
}

function mvnCleanInstallSkipTestSync(mainWindow, params) {

    const child = child_process.spawnSync('mvn', ['clean', 'install', '-DskipTests'], {
        cwd: params.path
    });

    console.log(child.status)
    if (child.status == 0) {
        mainWindow.webContents.send('status', child.status);
    }

    // view output (stdout & stderr combined)
    // must convert buffer to string
    // console.log(child.output.toString('utf8'))
}

function doAction(event, title) {
    const fs = require('fs');

    try {
        const data = fs.readFileSync(`/Users/vj/Documents/${title}`, 'utf8');
        return (data);
    } catch (err) {
        return (err);
    }

}


async function makeHTTPcall(event, userId) {
    // body...
    var axios = require('axios');

    var config = {
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/users/${userId}`,
        headers: {}
    };

    try {
        let response = await axios(config)
        let data = JSON.stringify(response.data);
        // console.log(data);
        const NOTIFICATION_TITLE = 'Your Buddy'
        const NOTIFICATION_BODY = 'HTTP call returned 200 data'

        new Notification({
            title: NOTIFICATION_TITLE,
            body: NOTIFICATION_BODY,
            // icon: path.join('', '/Users/vj/Code/electron-app-vxf/superheros_wall_droidviews_02.jpg')
        }).show();

        return data;
    } catch (error) {
        // console.log(error);
        const NOTIFICATION_TITLE = 'Your Buddy'
        const NOTIFICATION_BODY = `HTTP call failed ${error.response.status}`

        new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show();
        return error.response.status;
    }

}

function fillServices(event, params) {
    console.log(params.path);
    const child = child_process.spawnSync(
        'find', [params.path, '-maxdepth', '1', '-type', 'd'], {
        cwd: params.path
    });

    console.log(child.status)
    // console.log(child.output.toString('utf8'));

    return child.output.toString('utf8');


}


// fillServices(0, { path: "/Users/vj/Code/java/" })

module.exports = {
    makeHTTPcall, doAction, mvnCleanInstallSkipTestSync, mvnCleanInstallSkipTest, fillServices
}

// mvnCleanInstallSkipTestSync({ path: "/Users/vj/Code/java/batchcoupons" });