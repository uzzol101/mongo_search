import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artists: any;
  pagi: pagination;
  pageCount: any = 1;
  pagination: any;
  totalCount: any;
  pageLeft: Boolean = false;
  pageRight: Boolean = false;
  // form inputs
  search: String;
  ageMin: Number;
  ageMax: Number;
  activeYears: Number;
  gender: String;
  // assign a placeholder value, otherwise trim() will throw error
  sort: String = "sort by";
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.authService.getArtist().subscribe((data:any)=>{
    //    console.log( data);
    //     this.artists = data;
    //      
    // });
    this.searchForm();


  }


  searchForm() {
    let searchCriteria = {
      search: this.search,
      age: {
        ageMin: this.ageMin,
        ageMax: this.ageMax
      },
      activeYears: this.activeYears,
      gender: this.gender,
      sort: this.sort.trim()
    };
    this.authService.searchArtist(searchCriteria).subscribe((data: any) => {
      this.artists = data.all;
      this.pagination = data;
      console.log(data);

    });



  }

  paginationBack() {

    let searchCriteria = {
      search: this.search,
      age: {
        ageMin: this.ageMin,
        ageMax: this.ageMax
      },
      activeYears: this.activeYears,
      gender: this.gender,
      sort: this.sort.trim(),
      offset: this.pagination.offset - 10,
      limit: this.pagination.limit
    };
    this.authService.searchArtist(searchCriteria).subscribe((data: any) => {
      this.artists = data.all;
      this.pagination = data;

    });
    console.log(this.pagination.count);
    // desabled left arrow when offset is less than 11
    // startup page offset is 0 [increase step per click = 10]
    if (this.pagination.offset <= 11) {
      // when offset is 10 disabled left arrow [no content to go in left arrow side]
      this.pageLeft = false;

    }
    // decrease page count if only offset is greater than 10
    if (this.pagination.offset >= 10) {
      this.pageCount--;
      this.pagination += 10;

    }

  }

  paginationForward() {

    let searchCriteria = {
      search: this.search,
      age: {
        ageMin: this.ageMin,
        ageMax: this.ageMax
      },
      activeYears: this.activeYears,
      gender: this.gender,
      sort: this.sort.trim(),
      offset: this.pagination.offset + 10,
      limit: this.pagination.limit
    };
    this.authService.searchArtist(searchCriteria).subscribe((data: any) => {

      this.artists = data.all;
      this.pagination = data;
      this.pageCount += 1;

      if (this.pageCount === 2) {
        this.pagination.count -= 10;
        console.log("initial page");
      } else {

        this.pagination.count -= (this.pageCount * 10) - 10;
      }



    });
    // enable left arrow on forward click [content is available in left arrow side]
    this.pageLeft = true;


  }




}


interface pagination {
  limit: Number,
    count: Number,
    offset: Number
}
