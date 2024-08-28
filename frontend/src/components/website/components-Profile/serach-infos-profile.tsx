import './style-component.css'
import SearchNavBar from './nav-bar-search'
import ProfileSection from './ProfileSection'
function SearchInfoProfile()
{
    return(
        <div className="search-info-profile ">
            <SearchNavBar/>
            <ProfileSection/>
        </div>
    )
}
export default SearchInfoProfile