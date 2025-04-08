export interface Alert {
  icon: string;
  message: string | Object;
}

export interface AlertConfirm {
  icon: string;
  message: string | Object;
  area: string;
  id:any;
}

export interface AlertDelete {
  id:any,
  response :boolean
}
