import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artists: any;
  private pagi: any = {

  };
  pageCount: any = 1;

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
      // assign value to pagi.count only once do not set value again in the rest of the code
      this.pagi.count = data.count;
      // will update value in every request
      this.pagi.limit = data.limit;
      // will update value in every request
      this.pagi.offset = data.offset;

    });

  }

  // IMPORTANT NOTE
  //backend mongoose skip(pagi.offset) doing the magic
  // every page showing 10 records. so if i want to go advance i need to add pagi.offset + 10
  // if i press the back button i will deduct 10 from pagi.offset [pagi.offset -10]

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
      offset: this.pagi.offset - 10,
      limit: this.pagi.limit
    };
    this.authService.searchArtist(searchCriteria).subscribe((data: any) => {
      this.artists = data.all;

      this.pagi.limit = data.limit;
      this.pagi.offset = data.offset;

    });
    console.log(this.pagi.count);
    // desabled left arrow when offset is less than 11
    // startup page offset is 0 [increase step per click = 10]
    if (this.pagi.offset <= 11) {
      // when offset is 10 disabled left arrow [no content to go in left arrow side]
      this.pageLeft = false;

    }
    // decrease page count if only offset is greater than 10
    if (this.pagi.offset >= 10) {
      this.pageCount--;
      this.pagi.count += 10;
      // hide right arrow
      this.pageRight = false;


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
      offset: this.pagi.offset + 10,
      limit: this.pagi.limit
    };
    this.authService.searchArtist(searchCriteria).subscribe((data: any) => {

      this.artists = data.all;

      this.pagi.limit = data.limit;
      this.pagi.offset = data.offset;


      // while going forward [pagi.count greater than ]
      if (this.pagi.count > 10) {
        // increase the pageCount
        this.pageCount += 1;
        // decrease total number of records
        this.pagi.count -= 10;

      }
      if (this.pagi.count < 11) {
        // hide right arrow [end of the records]
        this.pageRight = true;
      }

    });
    // enable left arrow on forward click [content is available in left arrow side]
    this.pageLeft = true;


  }




}


interface pagination {
  limit: number,
    count: number,
    offset: number
}
