import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/models/Request';
import { UserRequestViewModel } from 'src/app/models/UserRequestViewModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit{
  reqId!: number;
  reqDetails: UserRequestViewModel = new UserRequestViewModel;
  // userDetails!: UserViewModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private reqService: RequestService,
    private authservice:AuthService,
    private router:Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((val) => {
      this.reqId = val['id'];
      this.fetchRequestDetails(this.reqId);
    });
  }

  fetchRequestDetails(reqId: number) {
    this.reqService
      .GetUserRequestDetail(reqId)
      //  this.userService.GetUsersListById(userId)
      .subscribe({
        next: (res) => {
          this.reqDetails = res;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

updatedreq = new Request();
req:any;
Approve(reqId:number){
this.reqService.GetRequestById(reqId).subscribe((data)=>{
this.req = data;
console.log(this.req);
this.updatedreq={
  requestId:reqId,
  userId :this.req.userId,
  projectId:this.req.projectId,
  reasonForTraveling:this.req.reasonForTraveling,
  status:"approved",
  managerId:this.req.managerId,
  documentId:this.req.documentId,
  AadharNumber:this.req.aadharNumber,
  createdBy:this.req.createdBy,
  createdDate:this.req.createdDate,
  modifiedBy:this.authservice.getUserName(),
  modifiedDate:Date.now,
  isActive:true,
}
this.reqService.UpdateRequest(reqId,this.updatedreq).subscribe({
  next: (res) => {
    console.log(res);
this.router.navigate(['/requests']);
  },
  error: (err) => {
    console.log(err);
  },
});
});
}

Reject(reqId:number){
    this.reqService.GetRequestById(reqId).subscribe((data)=>{
      this.req = data;
      console.log(this.req);
      this.updatedreq={
        requestId:reqId,
        userId :this.req.userId,
        projectId:this.req.projectId,
        reasonForTraveling:this.req.reasonForTraveling,
        status:"rejected",
        managerId:this.req.managerId,
        documentId:this.req.documentId,
        AadharNumber:this.req.aadharNumber,
        createdBy:this.req.createdBy,
        createdDate:this.req.createdDate,
        modifiedBy:this.authservice.getUserName(),
        modifiedDate:Date.now,
        isActive:true,
      }
      this.reqService.UpdateRequest(reqId,this.updatedreq).subscribe({
        next: (res) => {
          console.log(res);
      this.router.navigate(['/requests']);
        },
        error: (err) => {
          console.log(err);
        },
      });
      });
  }
  Return(reqId:number){
    this.reqService.GetRequestById(reqId).subscribe((data)=>{
      this.req = data;
      console.log(this.req);
      this.updatedreq={
        requestId:reqId,
        userId :this.req.userId,
        projectId:this.req.projectId,
        reasonForTraveling:this.req.reasonForTraveling,
        status:"returned",
        managerId:this.req.managerId,
        documentId:this.req.documentId,
        AadharNumber:this.req.aadharNumber,
        createdBy:this.req.createdBy,
        createdDate:this.req.createdDate,
        modifiedBy:this.authservice.getUserName(),
        modifiedDate:Date.now,
        isActive:true,
      }
      this.reqService.UpdateRequest(reqId,this.updatedreq).subscribe({
        next: (res) => {
          console.log(res);
      this.router.navigate(['/requests']);
        },
        error: (err) => {
          console.log(err);
        },
      });
      });
  }

  getUserRole():string{
    return this.authservice.getUserRole();
  }
}
