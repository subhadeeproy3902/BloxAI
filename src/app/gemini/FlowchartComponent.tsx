import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import { Excalidraw } from '@excalidraw/excalidraw';
import { explainFlowchart } from './api';

function FlowchartComponent() {
    const [flowchartData, setFlowchartData] = useState<any>(null);
    const [editorJsData, setEditorJsData] = useState<any>(null);
    const [explanation, setExplanation] = useState<any>(null);

    useEffect(() => {
        

        const generatedFlowchartData = {
    "elements": [
        {
            "type": "rectangle",
            "x": 100,
            "y": 100,
            "width": 200,
            "height": 100,
            "angle": 0,
            "strokeColor": "#000000",
            "backgroundColor": "#ffffff",
            "thickness": 1,
            "fillStyle": "hachure",
            "seed": 0,
            "version": 141,
            "versionNonce": 867983165,
            "isDeleted": false,
            "id": "bLbDhH0SMnLqvw4te5Q9i",
            "source": null,
            "versionGroup": "2hF2eRJ3va8GWc3MwJWWw",
            "remoteSource": null,
            "constraint": "none",
            "isAdded": false,
            "groupIds": []
        },
        {
            "type": "diamond",
            "x": 400,
            "y": 100,
            "width": 200,
            "height": 100,
            "angle": 0,
            "strokeColor": "#000000",
            "backgroundColor": "#ffffff",
            "thickness": 1,
            "fillStyle": "cross-hatch",
            "seed": 0,
            "version": 141,
            "versionNonce": 887640337,
            "isDeleted": false,
            "id": "JvHBCsfJciKae_DVOSfED",
            "source": null,
            "versionGroup": "2hF2eRJ3va8GWc3MwJWWw",
            "remoteSource": null,
            "constraint": "none",
            "isAdded": false,
            "groupIds": []
        },
        {
            "type": "arrow",
            "x": 250,
            "y": 150,
            "width": 150,
            "height": 50,
            "angle": 0,
            "strokeColor": "#000000",
            "backgroundColor": "#ffffff",
            "thickness": 1,
            "fillStyle": "solid",
            "seed": 0,
            "version": 141,
            "versionNonce": 924223195,
            "isDeleted": false,
            "id": "ncqJMJNQx1-K2xNMlD6Ve",
            "source": "bLbDhH0SMnLqvw4te5Q9i",
            "target": "JvHBCsfJciKae_DVOSfED",
            "versionGroup": "2hF2eRJ3va8GWc3MwJWWw",
            "remoteSource": null,
            "constraint": "none",
            "isAdded": false,
            "groupIds": []
        }
    ],
    "appState": {
        "width": 800,
        "height": 600,
        "offsetTop": 0,
        "offsetLeft": 0,
        "scrollTop": 0,
        "scrollLeft": 0,
        "name": "Excalidraw",
        "collaborators": [],
        "currentItemFontFamily": 1,
        "currentItemFontSize": 20,
        "currentItemStrokeColor": "#000000",
        "currentItemBackgroundColor": "#ffffff",
        "currentItemFillStyle": "hachure",
        "currentItemStrokeWidth": 1,
        "currentItemRoughness": 1,
        "currentItemOpacity": 100,
        "currentItemAngle": 0,
        "currentItemX": 400,
        "currentItemY": 300,
        "currentItemWidth": 200,
        "currentItemHeight": 100,
        "currentItemTextAlign": "left",
        "zenModeEnabled": false,
        "gridSize": 20,
        "shouldSnapToGrid": false,
        "viewBackgroundColor": "#edf2ff",
        "nameplate": true,
        "theme": "light",
        "appearance": "light",
        "activePageId": null
    }
};

        setFlowchartData(generatedFlowchartData);

        const fetchExplanation = async () => {
            const explanation = await explainFlowchart(generatedFlowchartData);
            setExplanation(explanation);
        };

        fetchExplanation();

        return () => {
         
        };
    }, []);

    const generateFlowchart = async () => {
       
        setFlowchartData(flowchartData);

        const explanation = await explainFlowchart(flowchartData);
        setExplanation(explanation);

        const editorJsContent = {
            time: new Date().getTime(),
            blocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: explanation,
                    },
                },
            ],
        };

        setEditorJsData(editorJsContent);
    };

    return (
        <div>
            <h2>Flowchart Creator and Explainer</h2>
            <button onClick={generateFlowchart}>Generate Flowchart and Explanation</button>

            <div style={{ width: '100%', height: '500px', border: '1px solid black' }}>
                <div id="excalidraw-canvas" />
            </div>

            <div style={{ width: '100%', height: '300px', border: '1px solid black' }}>
              
            </div>

            {explanation && (
                <div>
                    <h3>Explanation:</h3>
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
}

export default FlowchartComponent;
