var game = new Phaser.Game(360, 500, Phaser.AUTO, 'clicker', { preload: preload, create: create});

var grassSprite;
var buildOne;
var solarPanel;
var buildText;
var mineText;
var solarText;
var footerSprite;
var mineCount = [];
var buildCount = [];
var panelCount = [];
var counter = 0;
var buildBool = false;
var panelBool = false;
var bmd;
var mineCounter = 20;
var panelCounter = 0;

function preload() {

    game.load.image('button1', 'app/assets/button1.png')
    game.load.image('panelButton', 'app/assets/panelButton.png')
    game.load.image('grass', 'app/assets/grass.png');
    game.load.image('build1', 'app/assets/build1.png')
    game.load.image('panel', 'app/assets/panel.png')
    game.load.image('footer', 'app/assets/footer.png')
    game.load.image('header', 'app/assets/header.png')

}

function create() {
    grassSprite = game.add.tileSprite(0, 0, 360, 500, 'grass');
    footerSprite = game.add.sprite(180, 460, 'footer');
    footerSprite.anchor.setTo(0.5, 0.5);
    headerSprite = game.add.sprite(180, 40, 'header');
    headerSprite.anchor.setTo(0.5, 0.5);

    build1Button = game.add.sprite(40, 460, 'button1');
    build1Button.anchor.setTo(0.5, 0.5);
    build1Button.inputEnabled = true;
    build1Button.events.onInputDown.add(listener, this);

    solarButton = game.add.sprite(120, 460, 'panelButton')
    solarButton.anchor.setTo(0.5, 0.5);
    solarButton.inputEnabled = true;
    solarButton.events.onInputDown.add(listener2, this);

    buildText = game.add.text(20, 5, "Buildings: " + 0, {font: "16px Ariel", fill: '#ffffff' });
    mineText = game.add.text(20, 25, "Metal Ore: " + 20, {font: "16px Ariel", fill: "#ffffff" });
    solarText = game.add.text(20, 45, "Solar Cells: " + 0, {font: "16px Ariel", fill: "#ffffff" });

    buildOne = game.make.sprite(0,0, 'build1');
    buildOne.anchor.set(0.5)
    // buildOne.input.priorityID = 1;
    solarPanel = game.make.sprite(0,0, 'panel');
    solarPanel.anchor.set(0.5)

    bmd = game.add.bitmapData(360, 500);
    bmd.addToWorld();
    bmd.smoothed = false;

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

}

function listener () {
    if(buildBool === false){
        buildBool = true;
        console.log(buildBool);
        game.input.addMoveCallback(clickHandler, this);
    }
}

function listener2 () {
    if(panelBool === false){
        panelBool = true;
        console.log(panelBool);
        game.input.addMoveCallback(clickHandler2, this);
    }
}

function clickHandler (pointer, x, y) {
    if(pointer.isDown){
        console.log('clicked');
    }
    if(buildBool === true && pointer.isDown && mineCounter >= 10 && x < 360 && y < 398 && y > 100) {
        mineCount.push(0);
        handleCounters();
        bmd.draw(buildOne, x, y);
    }
}

function clickHandler2 (pointer, x, y) {
    if(pointer.isDown){
        console.log('clicked');
    }
    if(panelBool === true && pointer.isDown && mineCounter >= 10 && x < 360 && y < 398 && y > 100) {
        panelCount.push(0);
        handleCounters();
        bmd.draw(solarPanel, x, y);
    }
}

function updateCounter () {
    mineCounter+= mineCount.length;
    panelCounter+= panelCount.length / 4
    mineText.setText('Metal Ore: ' + mineCounter);
    solarText.setText('Solar Cells: ' + panelCounter)
}

function handleCounters () {
    buildCount.push(0);
    counter = buildCount.length;
    mineCounter-= 10;
    buildText.text = "Buildings: " + counter;
    buildBool = false;
    panelBool = false
}

