import urllib.request, json

from nba_api.stats.endpoints import teamgamelog
from nba_api.stats.static import teams
from nba_api.stats.static import players
from nba_api.stats.endpoints import leaguegamefinder


# loads box scores for a team into data frame
def getTeamBoxScoreForYear(teamName, season):
    teamNameId = getTeamIdFromName(teamName)
    # this should find all games where celtics were playing
    gamefinder = leaguegamefinder.LeagueGameFinder(team_id_nullable=teamNameId)
    games = gamefinder.get_data_frames()[0]

    #filter to the season required
    games_in_season = games[games.SEASON_ID.str[-4:] == season[:4]]
    return games_in_season



# gets all the box scores for a team between the given years
def getTeamBoxScoresBetweenYears(teamName, start_year, end_year):
    frame = getTeamBoxScoreForYear(teamName, formatYearToSeason(start_year))
    for x in range(end_year-start_year):
        season = formatYearToSeason(start_year+1+x)
        frame = frame.append(getTeamBoxScoreForYear('BOS', season), ignore_index=True)

    return frame


# takes a year as input, ex. 2017, and formats it to an NBA season, ex 2017-18
def formatYearToSeason(year):
    season = str(year) + "-" + str(year+1)[2:] # needs to be in the format 2017-18
    return season


# given a team abbreviation, gets the ID for the team
def getTeamIdFromName(teamName):
    nba_teams = teams.get_teams()
    team_dict = [team for team in nba_teams
         if team['abbreviation'] == teamName][0]
    return team_dict['id']



def writeFrameToCsv():
    



if __name__ == "__main__":
    frame = getTeamBoxScoresBetweenYears('BOS', 2015, 2018)
    # small_frame = frame[['GAME_DATE', 'MATCHUP', 'WL']]
    # print(small_frame)
    # print(frame['GAME_DATE'].values)