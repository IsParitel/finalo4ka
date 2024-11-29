import { makeAutoObservable } from "mobx";

export default class JobPageStore {
    constructor() {
        this._specials = []
        this._otrasls = []
        this._job_pages = []
        this._filteredJobPages = []
        this._selectedOtrasl = {}
        this._selectedSpecial = {}
        makeAutoObservable(this)
    }

    setJob_pages(job_pages) {
        this._job_pages = job_pages;
        this.setFilteredJobPages();
    }

    setOtrasls(otrasls) {
        this._otrasls = otrasls;
    }

    setSpecials(specials) {
        this._specials = specials;
    }

    setSelectedOtrasl(otrasl) {
        this._selectedOtrasl = otrasl;
        this.setFilteredJobPages();
    }

    setSelectedSpecial(special) {
        this._selectedSpecial = special;
        this.setFilteredJobPages();
    }

    setFilteredJobPages() {
        const filtered = this._job_pages.filter(job => {
            const matchesOtrasl = !this._selectedOtrasl.id || job.otraslId === this._selectedOtrasl.id;
            const matchesSpecial = !this._selectedSpecial.id || job.specialId === this._selectedSpecial.id;
            return matchesOtrasl && matchesSpecial;
        });
        this._filteredJobPages = filtered;
    }

    clearFilters() {
        this._selectedOtrasl = {};
        this._selectedSpecial = {};
        this.setFilteredJobPages();
    }

    get filteredJobPages() {
        return this._filteredJobPages;
    }

    get specials() {
        return this._specials;
    }

    get otrasls() {
        return this._otrasls;
    }

    get job_pages() {
        return this._job_pages;
    }

    get selectedOtrasl() {
        return this._selectedOtrasl;
    }

    get selectedSpecial() {
        return this._selectedSpecial;
    }
}
