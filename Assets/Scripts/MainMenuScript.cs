using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;

public class MainMenuScript : MonoBehaviour
{
    public Material[] skies;
    
    private string curTime;
    private GameObject timeText;

    private void Awake(){
        curTime = (System.DateTime.Now.ToString("HH"));
        timeText = GameObject.Find("TimeText");
    }

    private void Start(){
       
        // Change sky on start screen depending on the time of day
        // Night Time
        if(curTime == "22" || curTime == "23" || curTime == "24" || curTime == "0" || curTime == "1" || curTime == "2" || curTime == "3" || curTime == "4" || curTime == "5"){
            RenderSettings.skybox = skies[0];
        }
        // Morning Time
        else if(curTime == "6" || curTime == "7" || curTime == "8"){
            RenderSettings.skybox = skies[2];
        }
        // Afternoon Time
        else if(curTime == "9" || curTime == "10" || curTime == "11" || curTime == "12" || curTime == "13" || curTime == "14" || curTime == "15"){
            RenderSettings.skybox = skies[1];
        }
        // Evening Time
        else if(curTime == "16" || curTime == "17" || curTime == "18" || curTime == "19" || curTime == "20" || curTime == "21"){
            RenderSettings.skybox = skies[3];
        }
    }

    private void FixedUpdate(){
        curTime = (System.DateTime.Now.ToString("HH:mm"));
        timeText.GetComponent<TextMeshProUGUI>().text = curTime;
    }

    public void PlayGame()
    {
        SceneManager.LoadScene(1);
    }
}
