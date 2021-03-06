

import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WarriorsService } from '../warriors.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Warrior } from 'src/classes/warrior';
import { Team } from 'src/classes/team';
import { TeamsService } from '../teams.service';
import { MatStepper } from '@angular/material/stepper';
import { Map } from 'src/classes/map';
import { MapService } from '../map.service';
import { Target } from 'src/classes/target';
import { Sensor } from 'src/classes/sensor';
import { ErrorService } from '../error.service';
import { Wall } from 'src/classes/wall';


@Component({
  selector: 'app-new-session-dialog',
  templateUrl: './new-session-dialog.component.html',
  styleUrls: ['./new-session-dialog.component.scss']
})
export class NewSessionDialogComponent implements OnInit {

  warriors = [];
  teams = [];
  maps = [];
  chosenWarrior: Object
  chosenMap: Object;
  newMap = new Map('','',0,0);
  panelOpenState = false;
  ICONS_PATH = 'assets/icons_map/';
  ICONS_ELEMENTS = 'assets/icons_elements/'
  trainIcons = [
    this.ICONS_PATH + 'city-hall.svg', this.ICONS_PATH + 'town-hall.svg',this.ICONS_PATH + 'route.svg',
    this.ICONS_PATH + 'route2.svg', this.ICONS_PATH + 'running.svg', this.ICONS_PATH + 'target.svg',
    this.ICONS_PATH + 'gun.svg'
  ]
  numbers = [1,2,3,4,5,6]
  numOfTargets: number
  numOfSensors: number
  numOfWalls = 6;
  
  constructor(private warriorsService:WarriorsService, private teamsService: TeamsService, private mapService: MapService,
    public dialogRef: MatDialogRef<NewSessionDialogComponent>, private errorService: ErrorService,
    private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any)
    {}

  ngOnInit() {
    this.getData()
  }

  goForwardStepOne(stepper: MatStepper){
    if(this.chosenWarrior)
      stepper.next();
    return false
  }

  goForwardStepTwo(stepper: MatStepper){
    if(this.chosenMap==undefined)//undefined mean that the user choose to create a new map
      stepper.next();
    else{
      stepper.next();
      stepper.next();
    }
    return false
  }

  goForwardStepThree(stepper: MatStepper){
    if(this.newMap.trainName!=='' && this.newMap.icon!=='' &&
     this.numOfTargets!==undefined && this.numOfSensors!==undefined)
      stepper.next();
    return false
  }

  goBackStepThree(stepper: MatStepper){
    if(this.chosenMap==undefined)//undefined mean that the user choose to create a new map
      stepper.previous();
    else{
      stepper.previous();
      stepper.previous();
    }
    return false
  }
  
  close(flag: boolean){
    // console.log(this.chosenWarrior)
     //console.log(this.chosenMap)
    // console.log(this.newMap)
    //  console.log(this.numOfTargets)
    //  console.log(this.numOfSensors)
    if(!flag){
      this.dialogRef.close(flag);
      return
    }
    
    var data;
    if(this.chosenMap!==undefined){
      data = { warrior: this.chosenWarrior,
                  map: this.chosenMap
                }
      this.dialogRef.close(data);
      return
    }

    for(let i=0,j=0; i<this.numOfWalls;i++,j+=2){
      this.newMap.walls.push(new Wall('0'+j,'wall0'+i,this.ICONS_ELEMENTS + 'wall0'+i+'.svg'))
      this.newMap.walls.push(new Wall('0'+(j+1),'wall0'+i,this.ICONS_ELEMENTS + 'wall0'+i+'.svg'))
    }

    for(let i=0; i<this.numOfTargets;i++){
      let target = new Target(i,undefined,undefined);
      target.icon = this.ICONS_ELEMENTS + 'target.svg'
      this.newMap.targets.push(target)
    }

    for(let i=0; i<this.numOfSensors;i++){
      let sensor = new Sensor(i,undefined,undefined);
      sensor.icon = this.ICONS_ELEMENTS + 'sensor.svg'
      this.newMap.sensors.push(sensor)
    }

    this.mapService.addMap(this.newMap, (res)=>{
      if(res.status == 200){
        this.newMap._id = res.mapId;
        data = { warrior: this.chosenWarrior,
          map: this.newMap
        }
        this.dialogRef.close(data);
        return
      }
      this.errorService.openSnackBar('Error accoured while creating new map', 'Try again')
    }) 

  }

  getData(){
    this.warriorsService.getWarriors((dataA) => {
      this.warriors = Object.values(dataA).filter(function(element){
        return element['empty']==undefined
      })
      //console.log(this.warriors)
      this.teamsService.getTeams((dataB) => {
        this.teams = Object.values(dataB).filter(function(element){
          return element['empty']==undefined
        })
        for(var i=0; i<this.warriors.length; i++)
          for(var j=0;j<this.teams.length; j++)
            if(this.warriors[i].team == this.teams[j].name)
              this.warriors[i].teamPic=this.teams[j].pic
        this.mapService.getMaps((data) => {
          this.maps = Object.values(data).filter(function(element){
            return element['empty']==undefined
          })
          //console.log(this.maps)
        })
      })
    })
  
  }

}
