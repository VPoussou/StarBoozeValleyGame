
// Définitions des constantes PIXIjs
const application = PIXI.Application;
const app = new application({
    width:912,
    height:512,
    antialias: false
});
let apples = 0 // Compteur de clicks
let appleFall = 0 // Compteur de pommes sur l'écran
moultipass = 1
const graphics = PIXI.Graphics;

// Ajout de l'application au body
document.body.appendChild(app.view);

// Background bleu
// app.renderer.background.color = 0x22FFC

let posouvrier = app.screen.width / 2 - 90


function playGame() {

    // Ajout du background
    const preBackground = PIXI.BaseTexture.from('sprites/background_out_game.png')
    preBackground.scaleMode = 'linear'
    const background = PIXI.Sprite.from(preBackground);
    background.anchor.x = 0.5
    background.anchor.y = 0.5 
    background.x = app.screen.width /2
    background.y = app.screen.height /2
    background.scale.x = 4
    background.scale.y = 4
    app.stage.addChild(background);

    // GOOAAALLL
    gameGoal = 150


    // Ajout de l'arbre
    const preArbre = PIXI.BaseTexture.from('sprites/arbre.png')
    preArbre.scaleMode = 'linear'
    const arbre = PIXI.Sprite.from(preArbre);
    arbre.anchor.x = 0.5
    arbre.anchor.y = 0.5 
    arbre.x = app.screen.width /2
    arbre.y = app.screen.height /2
    arbre.scale.x = 3.9
    arbre.scale.y = 3.9
    app.stage.addChild(arbre);

    // Ajout de la grange
    const preGrange = PIXI.BaseTexture.from('sprites/grange-ouverte.png')
    preGrange.scaleMode = 'linear'
    const grange = PIXI.Sprite.from(preGrange);
    grange.anchor.x = 0.5
    grange.anchor.y = 0.5
    grange.x = app.screen.width /9.5
    grange.y = app.screen.height /1.75
    grange.scale.x = 2.5
    grange.scale.y = 2.5
    app.stage.addChild(grange);

    // Ajout de l'alambic
    const preAlambic = PIXI.BaseTexture.from('sprites/alambic_no1_baignoire.png')
    preAlambic.scaleMode = 'linear'
    const alambic = PIXI.Sprite.from(preAlambic);
    alambic.anchor.x = 0.5
    alambic.anchor.y = 0.5
    alambic.x = app.screen.width /1.5
    alambic.y = app.screen.height /1.4
    alambic.scale.x = 2.9
    alambic.scale.y = 2.9
    app.stage.addChild(alambic);

    // Ajout de la fusée
    const preFusee = PIXI.BaseTexture.from('sprites/fusee.png')
    preFusee.scaleMode = 'linear'
    const fusee = PIXI.Sprite.from(preFusee);
    fusee.anchor.x = 0.5
    fusee.anchor.y = 0.5
    fusee.x = app.screen.width /1.15
    fusee.y = app.screen.height /1.88
    fusee.scale.x = 4
    fusee.scale.y = 4
    fusee.zIndex = 5
    fuseeEtAlcool = new PIXI.Container()
    fuseeEtAlcool.sortableChildren = 'True'
    app.stage.sortableChildren = 'True'
    fuseeEtAlcool.addChild(fusee)
    app.stage.addChild(fuseeEtAlcool);



    // Ajout du bouton Recrutement
    const preBtnRecruit = PIXI.BaseTexture.from('sprites/btn-recruter.png')
    preBtnRecruit.scaleMode = 'linear'
    const btnRecruit = PIXI.Sprite.from(preBtnRecruit);
    btnRecruit.anchor.x = 0.5
    btnRecruit.anchor.y = 0.5
    btnRecruit.x = app.screen.width /2 - 100
    btnRecruit.y = 30
    btnRecruit.scale.x = 2
    btnRecruit.scale.y = 2
    app.stage.addChild(btnRecruit);



    // Ajout du bouton améliorer
    const preBtnUpg = PIXI.BaseTexture.from('sprites/btn-ameliorer.png')
    preBtnUpg.scaleMode = 'linear'
    const btnUpg = PIXI.Sprite.from(preBtnUpg);
    btnUpg.anchor.x = 0.5
    btnUpg.anchor.y = 0.5
    btnUpg.x = app.screen.width /2 + 100
    btnUpg.y = 30
    btnUpg.scale.x = 2
    btnUpg.scale.y = 2
    app.stage.addChild(btnUpg);

    
    // Ajout du bouton croix pr revenir au menu principal
    const prebtncroix = PIXI.BaseTexture.from('sprites/btn-croix.png')
    prebtncroix.scaleMode = 'linear'
    const btncroix = PIXI.Sprite.from(prebtncroix);
    btncroix.anchor.x = 0.5
    btncroix.anchor.y = 0.5
    btncroix.x = app.screen.width /2 + 400
    btncroix.y = 30
    btncroix.scale.x = 2
    btncroix.scale.y = 2
    app.stage.addChild(btncroix);

    



    // Gestion de l'interactivité de l'arbre
    background.eventMode = 'dynamic';
    background.buttonMode = true;

    // Création d'un container pour les pommes
    let appless = new PIXI.Container();

    // Fonction asynchrone qui va gérer toute la partie dynamique du jeu
    async function init() {

        // Initialisation de des variables
        nbAppleGen = 10 // Nb de pommes générées intialement
        nbAppleGenRuns = 0 // Compteur de pommes 
        let allApples = new PIXI.Container(); // Container pour gérer les pommes
        let appleBehaviourControl = [] // Liste de données par pomme
        
         // Fonction d'interactivité du background                     
        function bob() {
            appless.children[appleFall].y = anim.y
            appleBehaviourControl[appleFall][1] = true
            gen1Apple();
            apples += 1 * moultipass;
            appleFall += 1;
            ethanolHeight = apples/gameGoal
            console.log(ethanolHeight)
            console.log(`J'ai ${apples} pommes`)
            myRectangle = PIXI.Sprite.from('sprites/BoozeRectangle.png')
            myRectangle.x = 765
            myRectangle.y = 359
            // myRectangle.anchor.y = -1
            myRectangle.scale.y = - ethanolHeight
            myRectangle.zIndex = 2
            fuseeEtAlcool.addChild(myRectangle)
            app.stage.addChild(fuseeEtAlcool)
        } 
        // Fonction qui génère les pommes initiales
        function genApples(nbAppleGenRuns) {
            for(let i = 0; i < nbAppleGen; i++) {
                let preApple = PIXI.BaseTexture.from('sprites/apple_asset.png')
                preApple.scaleMode ='linear'
                let apple = PIXI.Sprite.from(preApple);
                apple.x = Math.round(333 + Math.random() * 250)
                apple.y = Math.round(130 + Math.random() * 150)
                appless.addChild(apple)
                
                apple.scale.x = 2
                apple.scale.y = 2

                
                // Génération d'une liste qui stocke des données pour chaque pomme
                for(let i = 0; i < nbAppleGen; i++) {
                    let pushingApple = false
                    let appleHasFallen = false
                    appleBehaviourControl.push([pushingApple, appleHasFallen])
                                }
            }
                allApples.addChild(appless);
                nbAppleGenRuns += 1 
            }
            // Fonction qui génère 1 pomme (utilisation au click pour garder un nombre de pommes constant dans l'arbre)
            function gen1Apple() {
                let preApple = PIXI.BaseTexture.from('sprites/apple_asset.png')
                preApple.scaleMode ='linear'
                let apple = PIXI.Sprite.from(preApple);
                apple.x = Math.round(333 + Math.random() * 250)
                apple.y = Math.round(135 + Math.random() * 150)
                apple.scale.x = 2
                apple.scale.y = 2
                appless.addChild(apple)
                allApples.addChild(appless)
                let pushingApple = false
                let appleHasFallen = false
                appleBehaviourControl.push([pushingApple, appleHasFallen])
            }
            app.stage.addChild(allApples);
            genApples(nbAppleGenRuns);
            // const texture = await PIXI.Assets.load('sprites/sprites.png')
            // Données json pour l'animation de gilbert
            const gilbertData = {"frames": {

                "Walk0.png":
                {
                    "frame": {"x":0,"y":0,"w":16,"h":21},
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": {"x":0,"y":0,"w":16,"h":21},
                    "sourceSize": {"w":16,"h":21},
                    "anchor": {"x":0.5,"y":0.5}
                },
                "Walk1.png":
                {
                    "frame": {"x":0,"y":21,"w":16,"h":21},
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": {"x":0,"y":0,"w":16,"h":21},
                    "sourceSize": {"w":16,"h":21},
                    "anchor": {"x":0.5,"y":0.5}
                },
                "Walk2.png":
                {
                    "frame": {"x":0,"y":42,"w":16,"h":21},
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": {"x":0,"y":0,"w":16,"h":21},
                    "sourceSize": {"w":16,"h":21},
                    "anchor": {"x":0.5,"y":0.5}
                },
                "Walk3.png":
                {
                    "frame": {"x":0,"y":63,"w":16,"h":21},
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": {"x":0,"y":0,"w":16,"h":21},
                    "sourceSize": {"w":16,"h":21},
                    "anchor": {"x":0.5,"y":0.5}
                },
                "Walk4.png":
                {
                    "frame": {"x":0,"y":84,"w":16,"h":21},
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": {"x":0,"y":0,"w":16,"h":21},
                    "sourceSize": {"w":16,"h":21},
                    "anchor": {"x":0.5,"y":0.5}
                },
                "Walk5.png":
                {
                    "frame": {"x":0,"y":105,"w":16,"h":21},
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": {"x":0,"y":0,"w":16,"h":21},
                    "sourceSize": {"w":16,"h":21},
                    "anchor": {"x":0.5,"y":0.5}
                },
                "Walk6.png":
                {
                    "frame": {"x":0,"y":126,"w":16,"h":21},
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": {"x":0,"y":0,"w":16,"h":21},
                    "sourceSize": {"w":16,"h":21},
                    "anchor": {"x":0.5,"y":0.5}
                }},
                animations: {
                    walk: ["Walk1.png","Walk2.png","Walk3.png","Walk4.png","Walk5.png","Walk6.png"]
                },
                meta: {
                    "app": "https://www.codeandweb.com/texturepacker",
                    "version": "1.1",
                    image: "sprites/gilbert_walkanim.png",
                    "format": "RGBA8888",
                    "size": {"w":16,"h":147},
                    "scale": "0.2",
                    "smartupdate": "$TexturePacker:SmartUpdate:a0a05d7a15f3ff1de732a52382db2deb:cee98a9ff1f089164529e5f11f98e94c:b57a075d1b40d777eddb5859f31e37d7$"
                }
                }
                
                // Gestion des textures et de l'animation de Gilbert
                snek = PIXI.BaseTexture.from(gilbertData.meta.image)
                snek.scaleMode = 'linear'
                const spriteGilbert = new PIXI.Spritesheet(snek, gilbertData);
                await spriteGilbert.parse();
                const anim =  new PIXI.AnimatedSprite(spriteGilbert.animations.walk);
                anim.animationSpeed = 0.1666
                anim.play()
                anim.x = app.screen.width / 2;
                anim.y = 425 ;
                anim.zIndex = 100
                app.stage.addChild(anim)
                
                const groove = 5 // Vitesse de marche de gilbert et conséquemment de déplacement pour les pommes
                
                // Initialisation des variables pour la boucle
                app.ticker.add(delta => loop(delta));
                let movingRight = true
                
                // Fonction bouclée qui gère le comportement des pommes 
                function loop(delta) {
                    if (anim.x < app.screen.width - 25 && movingRight == true) {
                    anim.x += groove
                    for (let i = 0; i < appless.children.length; i++) {
                        if (appless.children[i].x >= anim.x -10 && appless.children[i].x <= anim.x + 10 && movingRight == true && appleBehaviourControl[i][1] == true) {
                            appleBehaviourControl[i][0] = true
                        }
                        if (appleBehaviourControl[i][0] == true && appleBehaviourControl[i][1] == true) {
                            appless.children[i].x += groove
                        }
                    }
                    } else {
                        anim.scale.x = -1
                        movingRight = false
                        anim.x = anim.x - groove
                        if (anim.x <= 25 && movingRight == false) {
                            movingRight = true
                            anim.scale.x = 1
                        }
                    }
                }
                // Fonction lancée au click qui gère le changement de  comportement des pommes au click
                background.on('pointerdown', bob)
                
                // Texte du prix du recrutement
                employeePrice = 10 // A BACKER
                    // Ajout d'un texte prix
                let employeePriceText = new PIXI.Text(`${employeePrice}`);
                employeePriceText.x = 385
                employeePriceText.y = 16
                app.stage.addChild(employeePriceText);


                // Interactivité du bouton recrutement
                btnRecruit.eventMode = 'dynamic';
                btnRecruit.buttonMode = true;
                btnRecruit.on('pointerdown', function() {
                    if(apples >= employeePrice) {
                        app.ticker.add(delta => loop2(delta))
                        apples = apples - employeePrice
                        employeePrice = employeePrice * 2
                        employeePriceText.text = `${employeePrice}`
                        ethanolHeight = apples/gameGoal;
                        myRectangle.scale.y = - ethanolHeight
                        console.log(`WHUT ${ethanolHeight}`)
                        

                                    // Données json pour l'animation de l'ouvrier
                        const ouvrierData = {"frames": {

                            "Ouvrier 1.png":
                            {
                                "frame": {"x":0,"y":0,"w":21,"h":21},
                                "rotated": false,
                                "trimmed": false,
                                "spriteSourceSize": {"x":0,"y":0,"w":21,"h":21},
                                "sourceSize": {"w":21,"h":21}
                            },
                            "Ouvrier2.png":
                            {
                                "frame": {"x":21,"y":0,"w":21,"h":21},
                                "rotated": false,
                                "trimmed": false,
                                "spriteSourceSize": {"x":0,"y":0,"w":21,"h":21},
                                "sourceSize": {"w":21,"h":21}
                            },
                            "Ouvrier3.png":
                            {
                                "frame": {"x":42,"y":0,"w":21,"h":21},
                                "rotated": false,
                                "trimmed": false,
                                "spriteSourceSize": {"x":0,"y":0,"w":21,"h":21},
                                "sourceSize": {"w":21,"h":21}
                            },
                            "Ouvrier4.png":
                            {
                                "frame": {"x":63,"y":0,"w":21,"h":21},
                                "rotated": false,
                                "trimmed": false,
                                "spriteSourceSize": {"x":0,"y":0,"w":21,"h":21},
                                "sourceSize": {"w":21,"h":21}
                            },
                            "Ouvrier5.png":
                            {
                                "frame": {"x":84,"y":0,"w":21,"h":21},
                                "rotated": false,
                                "trimmed": false,
                                "spriteSourceSize": {"x":0,"y":0,"w":21,"h":21},
                                "sourceSize": {"w":21,"h":21}
                            }},
                            animations: {
                                work: ["Ouvrier 1.png","Ouvrier2.png","Ouvrier3.png","Ouvrier4.png","Ouvrier5.png"]
                            },
                            "meta": {
                                "app": "https://www.codeandweb.com/texturepacker",
                                "version": "1.1",
                                image: "sprites/ouvrier_anim_spritesheet.png",
                                "format": "RGBA8888",
                                "size": {"w":105,"h":21},
                                "scale": "0.3",
                                "smartupdate": "$TexturePacker:SmartUpdate:52ce1cb0a4fb1a63923d8ed3362b62c3:f396795c0819adb923d2c5f1dc299af8:96063ab88e99298b7ee844fa68fd62fc$"
                            }
                            }
                            

                        async function ouvriage() { 
                            // Gestion des textures et de l'animation de Gilbert
                                texouvrier = PIXI.BaseTexture.from(ouvrierData.meta.image)
                                texouvrier.scaleMode = 'linear'
                                const spriteOuvrier = new PIXI.Spritesheet(texouvrier, ouvrierData);
                                await spriteOuvrier.parse();
                                const animouvrier =  new PIXI.AnimatedSprite(spriteOuvrier.animations.work);
                                animouvrier.animationSpeed = 0.1666
                                animouvrier.play()
                                animouvrier.x = posouvrier;
                                animouvrier.y = 350 ;
                                app.stage.addChild(animouvrier)
                                posouvrier += 25

                            }
                            ouvriage()


                        } else {
                            console.log('Not enough apples');
                        }
                    })
                let tickerCounter = 0
                function loop2(delta) {
                    tickerCounter += 1
                    if(tickerCounter > 120 ) {
                        tickerCounter = 0
                        console.log(`I'm working here`)
                        bob()
                    }
                }
                // Texte du bouton upgrade
                let prixUpgrade = 20
                let upgradeText = new PIXI.Text(`${prixUpgrade}`)
                upgradeText.x = 585
                upgradeText.y = 16
                app.stage.addChild(upgradeText)

                // Interactivité du bouton upgrade
                let nbUpg = 0
                btnUpg.eventMode = 'dynamic'
                btnUpg.buttonMode = true
                btnUpg.on('pointerdown', function() {
                    if(apples >= prixUpgrade) {
                        nbUpg += 1
                        console.log('IZ DIS REAL LIFE')
                        app.stage.removeChild(alambic)
                        apples = apples - prixUpgrade
                        prixUpgrade = prixUpgrade * 2.5
                        upgradeText.text = `${prixUpgrade}`
                        ethanolHeight = apples/gameGoal;
                        myRectangle.scale.y = - ethanolHeight
                        console.log(`WHUT ${ethanolHeight}`)
                        if(nbUpg == 1) {
                            const preAlambic2 = PIXI.BaseTexture.from('sprites/alambic_no2_bois.png')
                            preAlambic2.scaleMode = 'linear'
                            window.alambic2 = PIXI.Sprite.from(preAlambic2)
                            alambic2.anchor.x = 0.5
                            alambic2.anchor.y = 0.5
                            alambic2.x = app.screen.width /1.5
                            alambic2.y = app.screen.height /1.4
                            alambic2.scale.x = 2.9
                            alambic2.scale.y = 2.9
                            app.stage.addChild(alambic2)
                        }
                        if(nbUpg == 2) {
                            app.stage.removeChild(alambic2)
                            const prealambic3 = PIXI.BaseTexture.from('sprites/alambic_no3_cuivre.png')
                            prealambic3.scaleMode = 'linear'
                            const alambic3 = PIXI.Sprite.from(prealambic3)
                            alambic3.anchor.x = 0.5
                            alambic3.anchor.y = 0.5
                            alambic3.x = app.screen.width /1.5
                            alambic3.y = app.screen.height /1.4
                            alambic3.scale.x = 2.9
                            alambic3.scale.y = 2.9
                            app.stage.addChild(alambic3);
                            }
                        moultipass += 0.2

                        }

                })

    }           


    init();

    // Gestion du bouton croix
    btncroix.eventMode = 'dynamic';
    btncroix.buttonMode = true;

    //Fonction générée pour ouvrir à la page menu 
    btncroix.on('pointerdown', playMenu) 
    
}

function playMenu(){
    //Ajout du background
    const preBackground = PIXI.BaseTexture.from('sprites/background_out_game.png')
    preBackground.scaleMode = 'linear'
    const background = PIXI.Sprite.from(preBackground);
    background.anchor.x = 0.5
    background.anchor.y = 0.5 
    background.x = app.screen.width /2
    background.y = app.screen.height /2
    background.scale.x = 4
    background.scale.y = 4
    app.stage.addChild(background);


    //Ajout du bouton nouvelle partie

    const preNouvellepartie = PIXI.BaseTexture.from('sprites/nouvelle_partie.png')
    preNouvellepartie.scaleMode = 'linear'
    const nouvellepartie = PIXI.Sprite.from(preNouvellepartie);
    nouvellepartie.anchor.x = 0.5
    nouvellepartie.anchor.y = 0.5
    nouvellepartie.x = app.screen.width /2
    nouvellepartie.y = app.screen.height /2.5
    nouvellepartie.scale.x = 2
    nouvellepartie.scale.y = 2
    app.stage.addChild(nouvellepartie);

    // Interactivité du bouton nouvelle partie
    nouvellepartie.eventMode = 'dynamic';
    nouvellepartie.buttonMode = true;
    nouvellepartie.on('pointerdown', playGame)

    

    //Ajout du bouton charger une partie

    const preChargerpartie = PIXI.BaseTexture.from('sprites/chargerpartie.png')
    preChargerpartie.scaleMode = 'linear'
    const chargerpartie = PIXI.Sprite.from(preChargerpartie);
    chargerpartie.anchor.x = 0.5
    chargerpartie.anchor.y = 0.5
    chargerpartie.x = app.screen.width /2
    chargerpartie.y = app.screen.height /2
    chargerpartie.scale.x = 2
    chargerpartie.scale.y = 2
    app.stage.addChild(chargerpartie);

    // Interactivité du bouton nouvelle partie
    chargerpartie.eventMode = 'dynamic';
    chargerpartie.buttonMode = true;
    chargerpartie.on('pointerdown', playParties)

    //Ajout du bouton règles

    const preRegles = PIXI.BaseTexture.from('sprites/regles_bouton.png')
    preRegles.scaleMode = 'linear'
    const regles = PIXI.Sprite.from(preRegles);
    regles.anchor.x = 0.5
    regles.anchor.y = 0.5
    regles.x = app.screen.width /2
    regles.y = app.screen.height /1.68
    regles.scale.x = 2
    regles.scale.y = 2
    app.stage.addChild(regles);

    // Interactivité du bouton règles
    regles.eventMode = 'dynamic';
    regles.buttonMode = true;
    regles.on('pointerdown', playRegles)
 

    //Ajout du bouton quitter

    const preQuitter = PIXI.BaseTexture.from('sprites/btn-quitter-long.png')
    preQuitter.scaleMode = 'linear'
    const quitter = PIXI.Sprite.from(preQuitter);
    quitter.anchor.x = 0.5
    quitter.anchor.y = 0.5
    quitter.x = app.screen.width /2
    quitter.y = app.screen.height /1.45
    quitter.scale.x = 2
    quitter.scale.y = 2
    app.stage.addChild(quitter);
    }

playMenu();

function playRegles(){

    //Ajout du background
    const preBackground = PIXI.BaseTexture.from('sprites/background_out_game.png')
    preBackground.scaleMode = 'linear'
    const background = PIXI.Sprite.from(preBackground);
    background.anchor.x = 0.5
    background.anchor.y = 0.5 
    background.x = app.screen.width /2
    background.y = app.screen.height /2
    background.scale.x = 4
    background.scale.y = 4
    app.stage.addChild(background);

    //Ajout du pop up règles 

    const prePopup = PIXI.BaseTexture.from('sprites/pop-up-regles.png')
    prePopup.scaleMode = 'linear'
    const popup = PIXI.Sprite.from(prePopup);
    popup.anchor.x = 0.5
    popup.anchor.y = 0.5 
    popup.x = app.screen.width /2
    popup.y = app.screen.height /2
    popup.scale.x = 4
    popup.scale.y = 4
    app.stage.addChild(popup);

    //Ajout du texte des règles 

    // Ajout d'un texte test
    PIXI.Assets.load('sprites/coders_crux.ttf').then(() => {
        let reglesText = new PIXI.BitmapText(`Comment jouer ?\n
    Au début de la partie, le joueur ne dispose que du clic pour cueillir les fruits en cliquant dessus. Gilbert se charge alors de les amener à l’alambic pour transformer les fruits en alcool.
        L’alcool sert de ressource principale nécessaire au décollage de la fusée mais également de monnaie principale du jeu, permettant au joueur d’acheter des ouvriers, qui, comme les clics, vont cueillir les fruits dans l’arbre, ainsi que des améliorations pour l’alambic. L’alambic permet quant à lui de bénéficier d’un multiplicateur sur la production d’alcool au gré des améliorations qui auront été apportées`,{
            fontFamily : 'Arial',
            fontSize: 48,
            fontStyle: 'regular',
            fill : '#563F33',
            align : 'center',
            wordWrap : true,
            wordWrapWidth: 280,
        },
            

        );

    reglesText.anchor.x = 0.5
    reglesText.anchor.y = 0.5 
    reglesText.x = app.screen.width /2
    reglesText.y = app.screen.height /2
    reglesText.scale.x = 1
    reglesText.scale.y = 1
    app.stage.addChild(reglesText); 

    // reglesText.updateText();
    // reglesText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    });

    // Ajout du bouton croix pr revenir au menu principal
    const prebtncroix = PIXI.BaseTexture.from('sprites/btn-croix.png')
    prebtncroix.scaleMode = 'linear'
    const btncroix = PIXI.Sprite.from(prebtncroix);
    btncroix.anchor.x = 0.5
    btncroix.anchor.y = 0.5
    btncroix.x = app.screen.width /2 + 400
    btncroix.y = 30
    btncroix.scale.x = 2
    btncroix.scale.y = 2
    app.stage.addChild(btncroix);
   
    // Gestion du bouton croix
    btncroix.eventMode = 'dynamic';
    btncroix.buttonMode = true;

    //Fonction générée pour ouvrir à la page menu 
    btncroix.on('pointerdown', playMenu) 

        
    }

playRegles();

function playParties() {

    //Ajout du background
    const preBackground = PIXI.BaseTexture.from('sprites/background_out_game.png')
    preBackground.scaleMode = 'linear'
    const background = PIXI.Sprite.from(preBackground);
    background.anchor.x = 0.5
    background.anchor.y = 0.5 
    background.x = app.screen.width /2
    background.y = app.screen.height /2
    background.scale.x = 4
    background.scale.y = 4
    app.stage.addChild(background);

    //Ajout du pop up règles 

    const prePopup = PIXI.BaseTexture.from('sprites/pop-up-regles.png')
    prePopup.scaleMode = 'linear'
    const popup = PIXI.Sprite.from(prePopup);
    popup.anchor.x = 0.5
    popup.anchor.y = 0.5 
    popup.x = app.screen.width /2
    popup.y = app.screen.height /2
    popup.scale.x = 4
    popup.scale.y = 4
    app.stage.addChild(popup);

    //Ajout du bouton première partie 

    const prePremierepartie = PIXI.BaseTexture.from('sprites/partie-1-long.png')
    prePremierepartie.scaleMode = 'linear'
    const premierepartie = PIXI.Sprite.from(prePremierepartie);
    premierepartie.anchor.x = 0.5
    premierepartie.anchor.y = 0.5
    premierepartie.x = app.screen.width /2
    premierepartie.y = app.screen.height /2.5
    premierepartie.scale.x = 2
    premierepartie.scale.y = 2
    app.stage.addChild(premierepartie);

    //Ajout du bouton deuxième partie

    const preDeuxiemepartie = PIXI.BaseTexture.from('sprites/partie-2-long.png')
    preDeuxiemepartie.scaleMode = 'linear'
    const deuxiemepartie = PIXI.Sprite.from(preDeuxiemepartie);
    deuxiemepartie.anchor.x = 0.5
    deuxiemepartie.anchor.y = 0.5
    deuxiemepartie.x = app.screen.width /2
    deuxiemepartie.y = app.screen.height /2 
    deuxiemepartie.scale.x = 2
    deuxiemepartie.scale.y = 2
    app.stage.addChild(deuxiemepartie);

    //Ajout du bouton troisieme partie

    const preTroisiemepartie = PIXI.BaseTexture.from('sprites/partie-3-long.png')
    preTroisiemepartie.scaleMode = 'linear'
    const troisiemepartie = PIXI.Sprite.from(preTroisiemepartie);
    troisiemepartie.anchor.x = 0.5
    troisiemepartie.anchor.y = 0.5
    troisiemepartie.x = app.screen.width /2
    troisiemepartie.y = app.screen.height /1.68
    troisiemepartie.scale.x = 2
    troisiemepartie.scale.y = 2
    app.stage.addChild(troisiemepartie);


    // Ajout du bouton croix pr revenir au menu principal
    const prebtncroix = PIXI.BaseTexture.from('sprites/btn-croix.png')
    prebtncroix.scaleMode = 'linear'
    const btncroix = PIXI.Sprite.from(prebtncroix);
    btncroix.anchor.x = 0.5
    btncroix.anchor.y = 0.5
    btncroix.x = app.screen.width /2 + 400
    btncroix.y = 30
    btncroix.scale.x = 2
    btncroix.scale.y = 2
    app.stage.addChild(btncroix);

   
    // Gestion du bouton croix
    btncroix.eventMode = 'dynamic';
    btncroix.buttonMode = true;

    //Fonction générée pour ouvrir à la page menu 
    btncroix.on('pointerdown', playMenu) 
    
    }

playParties();

    

