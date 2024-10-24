import {Params} from "@angular/router";
import {ActiveParamsType} from "../../types/active-param.type";

export class ActiveParamsUtil {
  static processParams(params: Params): ActiveParamsType {
    const activeParams: ActiveParamsType = {page: 1};


    if (params.hasOwnProperty('page')) {
      activeParams.page = +params['page'];
    }

    return activeParams;
  }
}
