import React from 'react';

import '../css/puzzle.css';

import { 
  Stage, 
  Sprite,
  Text,
} from '@inlet/react-pixi';

import {
  Row,
  Col, 
  Accordion,
  Button,
  Container
} from "react-bootstrap";

// membuat komponen dengan class
class Puzzle extends React.Component {
    constructor(props){

      super(props);

      this.state={
        scale: { x: 1, y: 1},
        stageWidth: window.innerHeight*0.4,
        stageHeight: window.innerHeight*0.5,
        restartCount: 0,
        wrongCount: 0,
        score: 100,
        rightAnimal: 0,
        gameStart: false,
        gameInProgress: false,
        gameEnd: false,
        pixiParent: null,

        currentAnimals:[],

        animals:[
          {
            'aid':0,
            'name':'Cow',
            'img':'cow.png',
            'width':50,
            'height':50,
            'hints':[
              'This animal gives birth to their young',
              'Their main product is often eaten with cereals',
              'Is a livestock',
              'Known to be white with black spots'
            ]
          },
          {
            'aid':1,
            'name':'Toucan',
            'img':'toucan.png',
            'width':50,
            'height':50,
            'hints':[
              'This animal lays eggs',
              'They are omnivorous. They love to eat both fruits and small animals or insects.',
              'They eat with their beaks',
              'Have wings, so they can fly'
            ]
          },
          {
            'aid':2,
            'name':'Fox',
            'img':'fox.png',
            'width':50,
            'height':50,
            'hints':[
              'This animal gives birth to their young',
              'They are carnivores',
              'Their size is medium, but bigger than usual cats',
              'Their fur is so soft!'
            ]
          },
          {
            'aid':3,
            'name':'Turtle',
            'img':'turtle.png',
            'width':50,
            'height':50,
            'hints':[
              'This animal lays eggs',
              'Most of them have a long life',
              'Several types of this animal is usually kept for hobbies',
              'Has a shell on their back'
            ]
          },
          {
            'aid':4,
            'name':'Koala',
            'img':'koala.png',
            'width':50,
            'height':50,
            'hints':[
              'This animal gives birth to their young',
              'They love to hug and sleep on trees',
              'Their main food is eucalyptus leaves',
              'Big ears and grey fur'
            ]
          },
        ]
      };

      this.rescaleSprite = this.rescaleSprite.bind(this);
      this.startGame = this.startGame.bind(this);
      this.restartGame = this.restartGame.bind(this);
      this.guessAnimal = this.guessAnimal.bind(this);
    }

    getRandomArbitrary = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    } 

    componentDidMount() {
      let pixiContainer = document.getElementById('pixi-parent')
      this.setState({
        pixiParent: pixiContainer
      })
    }

    rescaleSprite = () => {
      this.setState({
        scale:{ x:this.state.scale.x + 0.05, y:this.state.scale.y + 0.05 }
      })
    }

    restartGame = () => {
      let randomInt = this.getRandomArbitrary(0,4);
      this.setState({
        currentAnimals: this.state.animals.slice(),
        restartCount: this.state.restartCount + 1,
        gameEnd: false,
        gameStart: true,
        gameInProgress: true,
        score: 100,
        wrongCount: 0,
        rightAnimal: randomInt
      })
    }

    startGame = () => {
      let randomInt = this.getRandomArbitrary(0,4);
      this.setState({
        currentAnimals: this.state.animals.slice(),
        gameEnd: false,
        gameStart: true,
        rightAnimal: randomInt,
        wrongCount: 0,
        score: 100,
        gameInProgress: true,
      })
    }

    guessAnimal = (aid) => {
      if(aid === this.state.rightAnimal){
        this.setState({
          gameEnd:true,
          gameStart:false,
          gameInProgress: false,
        })
      }
      else{
        let copyOfCurAnimals = this.state.currentAnimals.slice();
        let indexToBeRemoved = 0;
        let count = 0;
        
        copyOfCurAnimals.forEach(a => {
          if(a.aid === aid){
            indexToBeRemoved = count
          }
          count++
        })

        copyOfCurAnimals.splice(indexToBeRemoved, 1);

        this.setState({
          currentAnimals: copyOfCurAnimals,
          wrongCount: this.state.wrongCount + 1,
          score: this.state.score-20
        })
      }
    }

    // pointerEnter = (aIndex) => {
    //   console.log("enter")
    //   let copyOfAnimals = this.state.animals.slice()
    //   copyOfAnimals[aIndex].width = 70;
    //   copyOfAnimals[aIndex].height = 70;
    //   this.setState({
    //     animals: copyOfAnimals
    //   })
    // }

    // pointerLeave = (aIndex) => {
    //   console.log("leave")
    //   let copyOfAnimals = this.state.animals.slice()
    //   copyOfAnimals[aIndex].width = 50;
    //   copyOfAnimals[aIndex].height = 50;
    //   this.setState({
    //     animals: copyOfAnimals
    //   })
    // }

    render(){
      return (
        <Container fluid className="h-100">
          <Row className="h-100 g-0">
            <Col className="p-md-5 p-sm-2" md="9">
              <Row className="h-100 g-0">
                <Col id="pixi-parent" md="7" className="text-center">
                    <Stage 
                      restart={this.state.restartCount}
                      height={this.state.stageHeight} 
                      width={this.state.stageWidth} 
                      options={{ backgroundColor: 0xeef1f5, resizeTo: this.state.pixiParent}}
                    >
                      {
                        this.state.gameStart &&  
                      
                        this.state.currentAnimals.map((animal, aIndex) => 
                          <Sprite
                            key={aIndex}
                            image={`/puzzle/${animal.img}`}
                            interactive={true}
                            scale={this.state.scale}
                            y={Math.random()*(this.state.stageHeight-50)}
                            x={Math.random()*(this.state.stageWidth-50)}
                            width={animal.width}
                            height={animal.height}
                            pointerdown={() => {
                              // this.rescaleSprite()
                              this.guessAnimal(animal.aid)
                              console.log("You're cliking on",animal.name);
                            }}
                          /> 
                          )
                      }
                      {
                        this.state.gameEnd && 
                        <Text
                          text={`You Win! The Answer is ${this.state.animals[this.state.rightAnimal].name}. Score: ${this.state.score}`}
                          anchor={0.5}
                          x={this.state.stageWidth/2}
                          y={this.state.stageHeight/2}
                          style={{
                              align: 'center',
                              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                              fontSize: 32,
                              fontWeight: 400,
                              fill: ['#46A3DB'], // gradient
                              stroke: '#3A7192',
                              strokeThickness: 2,
                              letterSpacing: 2,
                              wordWrap: true,
                              wordWrapWidth: this.state.stageWidth-(this.state.stageWidth/5),
                            }}
                        />
                      }
                    </Stage>
                </Col>
                <Col 
                  md="5" className="text-white"
                >
                  { 
                    this.state.gameStart ?
                    <div>
                      <p 
                        className="text-center"
                        style={{
                          fontSize:'1.1rem',
                          fontWeight: 600
                        }}
                      >
                        ANIMAL HINTS 
                      </p>
                      <ol>
                        {
                          this.state.animals[this.state.rightAnimal].hints.map((hint, hIndex) =>
                            
                              this.state.wrongCount >= hIndex &&
                              <li
                                key={hIndex}
                              >
                                { hint }
                              </li>
                            
                          )
                        }
                      </ol> 
                    </div>
                    :
                    <p 
                        className="text-center"
                        style={{
                          fontSize:'1.1rem',
                          fontWeight: 600
                        }}
                      >
                        Click the <b>Start Game</b> to begin.
                    </p>
                  }
                </Col>
                <Col xs="12">
                  <div className="text-center mt-3">
                    {
                      this.state.gameStart ?  
                      <Button className="" onClick={this.restartGame}>
                        Restart the Game
                      </Button>
                      :
                      <Button className="" onClick={this.startGame}>
                        Start the Game
                      </Button>
                    }
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="puzzle-menu px-2 pt-4 pb-5" md="3">
              <p className="puzzle-title text-white pb-3 text-center">
                Animal Guessing
              </p>
              <p className="text-white text-center">
                Welcome to the Puzzle Section! Animal Guessing is a mini game where 
                you need to guess the right animal based on the hint. You can read
                more about the game rule in the <b>Rules</b> below.
              </p>
              <Accordion defaultActiveKey="0">
                <Accordion.Item style={{ backgroundColor:' #323232', border: 'solid 1px grey' }} eventKey="0">
                  <Accordion.Header
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600
                    }}
                  >
                      Rules
                  </Accordion.Header>
                  <Accordion.Body 
                    className="text-white puzzle-rules"
                  >
                    <ol>
                      <li>
                        The main purpose of this game is to guess the right animal between 5 animals inside the square
                      </li>
                      <li>
                        One hint will be revealed at the beginning of the game
                      </li>
                      <li>
                        You can guess the right animal by clicking the animal image displayed inside the square
                      </li>
                      <li>
                        You can guess up to 4 times
                      </li>
                      <li>
                        Your score will be decreased by 20 and a new hint will be revealed for each wrong guess
                      </li>
                      <li>
                        The maximum score is 100 and the minimum score is 40
                      </li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      );
    }
  }
  
export default Puzzle;