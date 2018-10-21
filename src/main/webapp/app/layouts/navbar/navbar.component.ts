import {
    Component,
    OnInit
} from '@angular/core';
import { AuthorizationService } from '../../shared/authorization.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    cities = [{
            value: 'Delhi',
            viewValue: 'Delhi'
        },
        {
            value: 'Mumbai',
            viewValue: 'Mumbai'
        },
        {
            value: 'Kolkata',
            viewValue: 'Kolkata'
        },
        {
            value: 'Chennai',
            viewValue: 'Chennai'
        },
        {
            value: 'Bangalore',
            viewValue: 'Bangalore'
        }
    ];

    constructor(private _auth: AuthorizationService,
        private _router: Router) {}

    doLogout() {
        this._auth.logOut();
        this._router.navigateByUrl('/login');
    }

    ngOnInit() {}

}
