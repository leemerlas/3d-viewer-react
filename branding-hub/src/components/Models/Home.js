import React, { useRef, useState, useMemo } from "react"
import { Grid, Box, IconButton, Button, Card, CardContent, Typography, FormControl, Select, MenuItem, SvgIcon, Zoom, TextField, Tooltip } from "@mui/material"
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import AddIcon from '@mui/icons-material/Add'
import LoopIcon from '@mui/icons-material/Loop'
import RedoIcon from '@mui/icons-material/Redo'
import UndoIcon from '@mui/icons-material/Undo'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import MoveUpRoundedIcon from '@mui/icons-material/MoveUpRounded'
import DragMove from "../DragMove"

import Canvas3D from "./Canvas3D"
import { useDebounceEffect } from "./UseDebounceEffect"
import { canvasPreview } from "./CanvasPreview"

import 'react-image-crop/dist/ReactCrop.css'

function centerAspectCrop(mediaWidth, mediaHeight) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 100,
                height: 100
            },
            1,
            mediaWidth,
            mediaHeight,
        ),
        384,
        576,
    )
}

const Home = () => {
    const [color, setColor] = useState(0)
    const [imgSrc, setImgSrc] = useState('')
    const [imgName, setImgName] = useState('UPLOAD')
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState(null)
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(null)

    const [imgHeight, setImgHeight] = useState(0)
    const [imgWidth, setImgWidth] = useState(0)
    const [showScale, setShowScale] = useState(false)
    const [showRotate, setShowRotate] = useState(false)
    const [showMove, setShowMove] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [imgUrl, setImgUrl] = useState("")

    const onColorChange = (event) => {
        setColor(event.target.value)
    }

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
          setCrop(undefined) // Makes crop preview update between images.
          const reader = new FileReader()
          reader.addEventListener('load', () =>
            setImgSrc(reader.result.toString() || ''),
            setShowImg(true)
          )
          reader.readAsDataURL(event.target.files[0])
          setImgName(event.target.files[0].name)
        }
    }

    const onImageLoad = (event) => {
          const { width, height } = event.currentTarget
          setCrop(centerAspectCrop(width, height))
          setImgWidth(width)
          setImgHeight(height)
    }

    useDebounceEffect(
        async () => {
          if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
          ) {
            // We use canvasPreview as it's much faster than imgPreview.

            completedCrop.width = 384
            completedCrop.height = 576

            let dataUrl = canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                completedCrop,
                scale,
                rotate,
            )

            dataUrl.then((data) => {setImgUrl(data)})
          }
        },
        100,
        [completedCrop, scale, rotate],
    )

    // const handleToggleAspectClick = () => {
    //     if (aspect) {
    //       setAspect(undefined)
    //     } else if (imgRef.current) {
    //       const { width, height } = imgRef.current
    //       setAspect(16 / 9)
    //       setCrop(centerAspectCrop(width, height, 16 / 9))
    //     }
    // }

    const scaleImage = () => {
        if(showScale) {
            setShowScale(false)
        } else {
            setShowImg(true)
            setShowRotate(false)
            setShowScale(true)
            setShowMove(false)
        }
    }

    const rotateImage = () => {
        if(showRotate) {
            setShowRotate(false)
        } else {
            setShowImg(true)
            setShowScale(false)
            setShowRotate(true)
            setShowMove(false)
        }
    }

    const moveImage = () => {
        if(showMove) {
            setShowImg(true)
            setShowMove(false)
        } else {
            setShowImg(false)
            setShowScale(false)
            setShowRotate(false)
            setShowMove(true)
        }
    }

    const resetImage = () => {
        setRotate(0)
        setScale(1)

        setShowScale(false)
        setShowRotate(false)
    }

    const getModifiedLogo = (image, pixelCrop) => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
    }

    const loadToModel = () => {
        console.log(imgUrl);
    }

    //for dragging

    const [activeDrags, setActiveDrags] = useState(0)
    const [deltaPosition, setDeltaPosition] = useState({
        x: 0, 
        y: 0
    })


    const [positionArgs, setPositionArgs] = useState([0,0,0])
    const [rotationArgs, setRotationArgs] = useState(Math.PI)
    const [oldPosY, setOldPosY] = useState(0)
    const [draggable, setDraggable] = useState(true)

    const handleLogoMove = (e) => {
        let offsets = document.getElementById('drag-logo').getBoundingClientRect();
        console.log(offsets.top);
        console.log(offsets.left);
    }
    
    const handleDrag = (e, ui) => {
        const {x, y} = deltaPosition;
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY
        })

        // if (deltaPosition.y === 164) {
        //     setDraggable(false)
        // }

        let posY = 0;

        setOldPosY(deltaPosition.y)

        if (deltaPosition.y <= 164 && deltaPosition.y >= 0 ) {
            if (oldPosY >= deltaPosition.y && oldPosY <= 164) {
                posY = 0.025
                setPositionArgs([ 0, positionArgs[1]+posY, 0 ])

            } else if (oldPosY <= deltaPosition.y && oldPosY >= 0){
                posY = -0.025
                setPositionArgs([ 0, positionArgs[1]+posY, 0 ])
            }
        }
    };
    
    const onStart = () => {
        setActiveDrags(activeDrags + 1)
      };
    
    const onStop = () => {
        setActiveDrags(activeDrags - 1)
    };

    const dragHandlers = {onStart: onStart, onStop: onStop};

    return (
        <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
            <Grid container spacing={1} sx={{ padding: 2 }}>
                <Grid item xs={8}>
                    <Card sx={{ minWidth: 275, height: "92.5vh", borderWidth: 1, borderStyle: "solid", borderRadius: 10 }}>
                        <CardContent>
                            <Grid container spacing={1} sx={{ padding: 2 }} alignItems="center">
                                <Grid item sx={{ paddingRight: 2 }} >
                                    <IconButton aria-label="delete" sx={{ borderWidth: 1, borderStyle: "solid", borderColor: "black" }}>
                                        <FileUploadIcon sx={{ color: "black", fontSize: "0.6em" }}/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={3} sx={{ paddingRight: 2 }}> 
                                    <Card 
                                        sx={{ borderColor: "#FFCF7D", 
                                        borderStyle: "solid", 
                                        borderWidth: 1, 
                                        borderRadius: 3, 
                                        height: 40, 
                                        display: "inline-flex", 
                                        width: "100%" }}
                                        >
                                            <PhotoSizeSelectActualOutlinedIcon sx={{ color: "black", paddingTop: 1, paddingLeft: 1 }}/> 
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                                onChange={onSelectFile}
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button variant="raised" component="span" sx={{
                                                    ml: 1,
                                                    "&.MuiButtonBase-root:hover": {
                                                        bgcolor: "transparent"
                                                    },
                                                    width: 200,
                                                    fontSize: '0.8rem',
                                                    lineHeight: 2.5
                                                }}>
                                                    {imgName}
                                                </Button>
                                            </label> 
                                    </Card>
                                </Grid>
                                <Grid item xs={3} >
                                    <Card 
                                        sx={{ borderColor: "#FFCF7D", 
                                        borderStyle: "solid", 
                                        borderWidth: 1, 
                                        borderRadius: 3, 
                                        height: 40, 
                                        display: "inline-flex", 
                                        width: "100%" }}
                                        >
                                            <PaletteOutlinedIcon sx={{ color: "black", paddingTop: 1, paddingLeft: 1, paddingRight: 1 }}/>
                                            <FormControl variant='outlined' sx={{ width: "100%", paddingRight: 1 }} focused={false}>
                                                <Select
                                                notched={false}
                                                sx={{ height: 40, 
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'transparent'
                                                    }, 
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'transparent'
                                                    }
                                                }}
                                                IconComponent={MenuOutlinedIcon}
                                                onChange={onColorChange}
                                                value={color}
                                                >
                                                    <MenuItem selected disabled value={0} style={{ display: "none", color: "lightgray" }}>
                                                        <em style={{ color: "lightgray" }}>Select color variant</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                    </Card>
                                </Grid>
                                {false && <Grid item xs={1} sx={{ marginLeft: 2 }}>
                                    <Tooltip title="Load Image to Model" arrow>
                                        <IconButton variant="outlined" sx={{ color: "#ffbf4f", borderColor: "#FFCF7D", border: 1 }} onClick={loadToModel}>
                                            <MoveUpRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>}
                            </Grid>
                            <Grid container spacing={1} sx={{ paddingLeft: 2 }} alignItems="center">
                                <Grid item xs={0} sx={{ paddingRight: 2 }} >
                                    <IconButton aria-label="delete" sx={{ borderWidth: 1, borderStyle: "solid", borderColor: "black" }}>
                                        <AddIcon sx={{ color: "black", fontSize: "0.6em" }}/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2}>
                                    Additional Color
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 5 }}  alignItems="center">
                                <Grid item xs={1} >
                                    <Card sx={{ height: "100%", borderWidth: 1, borderStyle: "solid", borderRadius: 5, textAlign: 'center', paddingBottom: 2, paddingTop: 1}}>
                                        <Typography sx={{ paddingBottom: 2, fontWeight: 900 }}>TOOLS</Typography>
                                        {/* reset button */}
                                        <IconButton sx={{ border: 0 }} onClick={resetImage}>
                                            <LoopIcon sx={{ color: "black", fontSize: "2em" }}/>
                                        </IconButton>
                                        <Typography sx={{ paddingBottom: 1, paddingTop: 0 }}>RESET</Typography>
                                        {/* undo button */}
                                        <IconButton  sx={{ border: 0 }}>
                                            <UndoIcon sx={{ color: "black", fontSize: "2em" }}/>
                                        </IconButton>
                                        <Typography sx={{ paddingBottom: 1, paddingTop: 0 }}>UNDO</Typography>
                                        {/* redo button */}
                                        <IconButton  sx={{ border: 0 }}>
                                            <RedoIcon sx={{ color: "black", fontSize: "2em" }}/>
                                        </IconButton>
                                        <Typography sx={{ paddingBottom: 1, paddingTop: 0 }}>REDO</Typography>
                                        {/* move button */}
                                        <IconButton sx={{ border: 0 }} onClick={moveImage} style={ showMove ? { backgroundColor: 'lightgray' } : { }}>
                                            <SvgIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            sx={{ color: "black", fontSize: "2em" }}>
                                                <polyline points="5 9 2 12 5 15"></polyline>
                                                <polyline points="9 5 12 2 15 5"></polyline>
                                                <polyline points="15 19 12 22 9 19"></polyline>
                                                <polyline points="19 9 22 12 19 15"></polyline>
                                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                                <line x1="12" y1="2" x2="12" y2="22"></line>
                                            </SvgIcon>
                                        </IconButton>
                                        <Typography sx={{ paddingBottom: 1, paddingTop: 0 }}>MOVE</Typography>
                                        {/* rotate button */}
                                        <IconButton sx={{ border: 0 }} onClick={rotateImage} style={ showRotate ? { backgroundColor: 'lightgray' } : { }}>
                                            <SvgIcon viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            sx={{ color: "black", fontSize: "2em" }}>
                                                <g id="Layer_59" data-name="Layer 59">
                                                    <path d="M39.75,22.28A1.5,1.5,0,0,0,41.05,24l9.58,1.19a1.56,1.56,0,0,0,1.28-.47,1.66,1.66,0,0,0,.3-.49h0a1.31,1.31,0,0,0,.09-.34l1.19-9.58a1.5,1.5,0,0,0-3-.37l-.64,5.21C37.4,2.29,10.63,11,10.5,32A21.81,21.81,0,0,0,53,38.79a1.5,1.5,0,0,0-2.85-.93A18.81,18.81,0,0,1,13.5,32c.16-18.73,24.38-25.79,34.6-10.2L41.42,21A1.5,1.5,0,0,0,39.75,22.28Z"/>
                                                </g>
                                            </SvgIcon>
                                        </IconButton>
                                        <Typography sx={{ paddingBottom: 1, paddingTop: 0 }}>ROTATE</Typography>
                                        {/* scale button */}
                                        <IconButton sx={{ border: 0 }} onClick={scaleImage} style={ showScale ? { backgroundColor: 'lightgray' } : { }}>
                                            <ZoomOutMapIcon sx={{ color: "black", fontSize: "2em" }}/>
                                        </IconButton>
                                        <Typography sx={{ paddingBottom: 1, paddingTop: 0 }}>SCALE</Typography>
                                    </Card>
                                </Grid>
                                {<Grid item xs={5} sx={{ display: 'none' }}>
                                    <div>
                                        <canvas
                                            ref={previewCanvasRef}
                                            style={{
                                                border: '1px solid black',
                                                objectFit: 'contain',
                                                width: 384,
                                                height: 576,
                                            }}
                                        >
                                            
                                        </canvas>
                                    </div>
                                </Grid>}
                                <Grid item xs={6} sx={{ minHeight: 630, margin: 'auto' }} align="center">
                                    <Typography sx={{ fontSize: "1.5em", fontWeight: 200 }}>Branding Dimensions: 3" x 2"</Typography>
                                    <Typography sx={{ fontSize: "0.95em", fontWeight: 200, marginTop: -1 }}>Silk Screen - Centered on Front</Typography>
                                    <Grid item xs={4} sx={{ padding: 2 }}>
                                        {showScale && <TextField size="small" id="outlined-basic" label="Scale" variant="outlined" type={'number'} inputProps={{ step: "0.1", defaultValue: scale }} onChange={(e) => {setScale(e.target.value)}} />}
                                        {showRotate && <TextField size="small" id="outlined-basic" label="Rotate" variant="outlined" type={'number'} inputProps={{ step: "1", defaultValue: rotate }} onChange={(e) => {setRotate(e.target.value)}} />}
                                    </Grid>
                                    {imgSrc && showImg && 
                                    <Grid style={{ backgroundColor: "#ba0c2f", width: '384px', height: '576px', marginTop: 10 }}>
                                        <ReactCrop
                                            crop={crop}
                                            disabled
                                            style={{ height: '576px', width: '384px' }}
                                            onChange={(_, percentCrop) => {setCrop(percentCrop); console.log(crop);}}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            // aspect={aspect}
                                        >
                                            <img
                                                ref={imgRef}
                                                alt="Logo Here"
                                                src={imgSrc}
                                                style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, marginTop: 96 }}
                                                onLoad={onImageLoad}
                                            />
                                        </ReactCrop>
                                    </Grid>}
                                    {showMove && <div style={{ padding: 0, position: 'relative' }}>
                                            <div style={{ backgroundColor: "#ba0c2f", width: '384px', height: '576px' }}>
                                                <div style={{ paddingTop: 15, cursor: 'grab' }} >
                                                    <img
                                                        id='drag-logo'
                                                        alt="Move Me"
                                                        src={imgSrc}
                                                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, maxHeight: "50vh", maxWidth: 350}}
                                                        // onLoad={onImageLoad}
                                                    />
                                                </div>
                                            </div>
                                            
                                    </div>}
                                </Grid>
                                
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <div id="canvas-area" style={{ height: "95vh" }}>
                        <Canvas3D image={imgUrl} deltaPosition={deltaPosition} positionArgs={positionArgs} rotationArgs={rotationArgs}/>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home