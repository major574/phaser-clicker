var game = new Phaser.Game(360, 500, Phaser.AUTO, 'clicker', { preload: preload, create: create});

var grassSprite;
var buildOne;
var buildText;
var mineText;
var buildCount = [];
var counter = 0;
var button;
var buildBool = false;
var bmd;
var mineCounter = 20;

function preload() {

    game.load.image('button1', 'app/assets/button1.png')
    game.load.image('grass', 'app/assets/grass.png');
    game.load.image('build1', 'app/assets/build1.png')

}

function create() {
    grassSprite = game.add.tileSprite(0, 0, 800, 500, 'grass');
    
    build1Button = game.add.sprite(40, 460, 'button1');
    build1Button.anchor.setTo(0.5, 0.5);
    build1Button.inputEnabled = true;
    build1Button.events.onInputDown.add(listener, this);

    buildText = game.add.text(20, 16, "Buildings: " + 0, {font: "16px Ariel", fill: '#ffffff' });
    mineText = game.add.text(20, 40, "Energy: " + 20, {font: "16px Ariel", fill: "#ffffff" })

    buildOne = game.make.sprite(0,0, 'build1');
    buildOne.anchor.set(0.5)

    bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();
    bmd.smoothed = false;

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

}

function listener () {
    if(buildBool === false){
        buildBool = true;
        game.input.addMoveCallback(clickGrass, this);
        console.log(buildBool);
    }
}

function clickGrass (pointer, x, y) {
    if(buildBool === true && pointer.isDown && mineCounter > 10) {
        buildCount.push(0);
        counter = buildCount.length;
        buildText.text = "Buildings: " + counter;
        bmd.draw(buildOne, x, y);
        mineCounter-= 10;
        buildBool = false;
        console.log(buildBool);
    }
}

function updateCounter () {
    mineCounter+= buildCount.length;
    mineText.setText('Energy: ' + mineCounter);

}

