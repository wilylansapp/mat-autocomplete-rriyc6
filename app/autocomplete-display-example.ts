import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';

export class User {
  constructor(public name: string) {}
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'autocomplete-display-example',
  templateUrl: 'autocomplete-display-example.html',
  styleUrls: ['autocomplete-display-example.css'],
})
export class AutocompleteDisplayExample {
  myControl = new FormControl();
  myControlsTwo = new FormControl();

  selectedOption: string;

  userOptions = [new User('Mary'), new User('Shelley'), new User('Igor')];

  OtherUserOptions = [];

  filteredOptions: Observable<User[]>;
  filtredOther: Observable<User[]>;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith({} as User),
      map((user) => (user && typeof user === 'object' ? user.name : user)),
      map((name: string) =>
        name ? this.filter(name) : this.userOptions.slice()
      )
    );
    // const customerSelected = localStorage.getItem('customerSelected');
    // if (customerSelected) {
    //   const valuePared = JSON.parse(customerSelected);
    //   this.myControl.setValue(valuePared);
    //   this.interValData();
    // }
  }

  filter(name: string): User[] {
    return this.userOptions.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  filterOther(name: string): User[] {
    return this.OtherUserOptions.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }

  updateSelectedOption(event: any) {
    console.log(event);
    // const valueSelected = JSON.stringify(event.option.value);
    // localStorage.setItem('customerSelected', valueSelected);
    this.interValData();
  }

  interValData() {
    timer(1000).subscribe((value) => {
      this.OtherUserOptions = [
        new User('Mary'),
        new User('Shelley'),
        new User('Igor'),
      ];
      this.filtredOther = this.myControlsTwo.valueChanges.pipe(
        startWith({} as User),
        map((user) => (user && typeof user === 'object' ? user.name : user)),
        map((name: string) => {
          console.log(name, this.OtherUserOptions);
          return name ? this.filterOther(name) : this.OtherUserOptions.slice();
        })
      );
    });
  }
}
/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
