import { Injectable } from '@angular/core';
import { Campaign } from '../interfaces/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  listCampaign: Campaign[] = [
    {campaign_id: 1, campaign_name: 'Hydrogen',campaign_capacity: 1, campaign_start_date: new Date,campaign_end_date:new Date,campaign_observations:'Hydrogen', campaign_state:'Hydrogen'},
    {campaign_id: 2, campaign_name: 'Helium', campaign_capacity: 1,campaign_start_date: new Date,campaign_end_date:new Date,campaign_observations:'Hydrogen', campaign_state:'Hydrogen'},
    {campaign_id: 3, campaign_name: 'Lithium', campaign_capacity: 2,campaign_start_date: new Date,campaign_end_date:new Date,campaign_observations:'Hydrogen', campaign_state:'Hydrogen'},
    {campaign_id: 4, campaign_name: 'Beryllium', campaign_capacity: 3,campaign_start_date: new Date,campaign_end_date:new Date,campaign_observations:'Hydrogen', campaign_state:'Hydrogen'},

  ];

  constructor() { }

  getCampaign(){
    return this.listCampaign.slice();
  }

  eliminarCampaign(index: number){
    this.listCampaign.splice(index,1);
  }

  agregarCampaign(campaign: Campaign){
    this.listCampaign.unshift(campaign);
  }

  addEditarCampaign(campaign: Campaign){
    this.listCampaign.unshift(campaign);
  }
}
