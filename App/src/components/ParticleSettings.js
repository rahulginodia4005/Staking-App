import React,{Component} from 'react'
import Particles from 'react-tsparticles';

class ParticleSettings extends Component {
    render() {
        return (
            <div>
                <Particles height='1000px' width='100vw' id='tsparticles'
                options={{
                    background: {
                        color: {
                            value: "#c3cc5c"
                        }
                    },
                    fpsLimit:60,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push',
                            },
                            onHover: {
                                enable: true,
                                mode: 'repulse',
                            },
                            resize: true,
                        },
                    },
                    modes: {
                        bubble: {
                          distance: 400,
                          duration: 2,
                          opacity: 0.8,
                          size: 40,
                        },
                        push: {
                          quantity: 4,
                        },
                        repulse: {
                          distance: 200,
                          duration: 0.4,
                        },
                    },
                    particles: {
                        color: {
                          value: "#f00511",
                        },
                        links: {
                          color: "#f00511",
                          distance: 150,
                          enable: true,
                          opacity: 0.5,
                          width: 1,
                        },
                        collisions: {
                          enable: true,
                        },
                        move: {
                          direction: "none",
                          enable: true,
                          outMode: "bounce",
                          random: false,
                          speed: 6,
                          straight: false,
                        },
                        number: {
                          density: {
                            enable: true,
                            area: 800,
                          },
                          value: 80,
                        },
                        opacity: {
                          value: 0.5,
                        },
                        shape: {
                          type: "square",
                        },
                        size: {
                          random: true,
                          value: 5,
                        },
                      },
                      detectRetina: true,
                }} />
            </div>
        )

    }
}

export default ParticleSettings;