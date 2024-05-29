import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import data from "../large-file.json" assert { type: 'json' };

const typeDefs = `#graphql

    type Record {
        id:         ID!
        type:       String!
        public:     Boolean!
        created_at: String!
        payload:    Payload!
        repo:       Repo!
        org:        Actor
    }

    type Payload {
        ref:            String
        ref_type:       String
        master_branch:  String
        description:    String
        pusher_type:    String
        push_id:        Int
        size:           Int
        distinct_size:  Int
        head:           String
        before:         String
        action:         String
        number:         Int

        commits:        [Commit]
        release:        Release
        pull_request:   PayloadPullRequest
        issue:          Issue
        forkee:         Forkee
        pages:          [Page]
        comment:        Comment
        member:         Member
    }

    type Commit {
        sha:      String
        author:   Author
        message:  String
        distinct: Boolean
        url:      String
    }

    type Comment {
        url:                 String
        html_url:            String
        issue_url:           String
        id:                  Int
        user:                Member
        created_at:          String
        updated_at:          String
        body:                String
        diff_hunk:           String
        path:                String
        position:            Int
        original_position:   Int
        commit_id:           String
        original_commit_id:  String
        pull_request_url:    String
        links:              CommentLinks
        line:                Int
    }
    
    type CommentLinks {
        self:         Html!
        html:         Html!
        pull_request: Html!
    }
    
    type Html {
        href: String!
    }

    type Release {
        url:              String
        assets_url:       String
        upload_url:       String
        html_url:         String
        id:               Int
        tag_name:         String
        target_commitish: String
        name:             String
        draft:            Boolean
        author:           Member
        prerelease:       Boolean
        created_at:       String
        published_at:     String
        assets:           [Asset]
        tarball_url:      String
        zipball_url:      String
        body:             String
    }
    
    type Asset {
        url:                  String
        id:                   Int
        name:                 String
        label:                String
        uploader:             Member
        content_type:         String
        state:                String
        size:                 Int
        download_count:       Int
        created_at:           String
        updated_at:           String
        browser_download_url: String
    }
    
    type Member {
        login:               String
        id:                  Int
        avatar_url:          String
        gravatar_id:         String
        url:                 String
        html_url:            String
        followers_url:       String
        following_url:       String
        gists_url:           String
        starred_url:         String
        subscriptions_url:   String
        organizations_url:   String
        repos_url:           String
        events_url:          String
        received_events_url: String
        type:                String
        site_admin:          Boolean
    }

    type Author {
        email: String
        name:  String
    }

    type PayloadPullRequest {
        url:                 String
        id:                  Int
        html_url:            String
        diff_url:            String
        patch_url:           String
        issue_url:           String
        number:              Int
        state:               String
        locked:              Boolean
        title:               String
        user:                Member
        body:                String
        created_at:          String
        updated_at:          String
        closed_at:           String
        merged_at:           String
        merge_commit_sha:    String
        assignee:            Member
        milestone:           Milestone
        commits_url:         String
        review_comments_url: String
        review_comment_url:  String
        comments_url:        String
        statuses_url:        String
        head:                Base
        base:                Base
        _links:              PullRequestLinks
        merged:              Boolean
        mergeable:           Boolean
        mergeable_state:     String
        merged_by:           Member
        comments:            Int
        review_comments:     Int
        commits:             Int
        additions:           Int
        deletions:           Int
        changed_files:       Int
    }

    type Milestone {
        url:           String!
        labels_url:    String!
        id:            Int!
        number:        Int!
        title:         String!
        description:   String!
        creator:       Member!
        open_issues:   Int!
        closed_issues: Int!
        state:         String!
        created_at:    String!
        updated_at:    String!
        due_on:        String!
        closed_at:     String!
    }

    type Base {
        label: String!
        ref:   String!
        sha:   String!
        user:  Member!
        repo:  Forkee!
    }

    type Forkee {
        id:                Int!
        name:              String!
        full_name:         String!
        owner:             Member!
        private:           Boolean!
        html_url:          String!
        description:       String!
        fork:              Boolean!
        url:               String!
        forks_url:         String!
        keys_url:          String!
        collaborators_url: String!
        teams_url:         String!
        hooks_url:         String!
        issue_events_url:  String!
        events_url:        String!
        assignees_url:     String!
        branches_url:      String!
        tags_url:          String!
        blobs_url:         String!
        git_tags_url:      String!
        git_refs_url:      String!
        trees_url:         String!
        statuses_url:      String!
        languages_url:     String!
        stargazers_url:    String!
        contributors_url:  String!
        subscribers_url:   String!
        subscription_url:  String!
        commits_url:       String!
        git_commits_url:   String!
        comments_url:      String!
        issue_comment_url: String!
        contents_url:      String!
        compare_url:       String!
        merges_url:        String!
        archive_url:       String!
        downloads_url:     String!
        issues_url:        String!
        pulls_url:         String!
        milestones_url:    String!
        notifications_url: String!
        labels_url:        String!
        releases_url:      String!
        created_at:        String!
        updated_at:        String!
        pushed_at:         String!
        git_url:           String!
        ssh_url:           String!
        clone_url:         String!
        svn_url:           String!
        homepage:          String!
        size:              Int!
        stargazers_count:  Int!
        watchers_count:    Int!
        language:          String!
        has_issues:        Boolean!
        has_downloads:     Boolean!
        has_wiki:          Boolean!
        has_pages:         Boolean!
        forks_count:       Int!
        mirror_url:        String!
        open_issues_count: Int!
        forks:             Int!
        open_issues:       Int!
        watchers:          Int!
        default_branch:    String!
        public:            Boolean
    }
    
    type PullRequestLinks {
        self:            Html!
        html:            Html!
        issue:           Html!
        comments:        Html!
        review_comments: Html!
        review_comment:  Html!
        commits:         Html!
        statuses:        Html!
    }

    type Issue {
        url:           String!
        labels_url:    String!
        comments_url:  String!
        events_url:    String!
        html_url:      String!
        id:            Int!
        number:        Int!
        title:         String!
        user:          Member!
        labels:        [Label]!
        state:         String!
        locked:        Boolean!
        assignee:      Member!
        milestone:     Milestone!
        comments:      Int!
        created_at:    String!
        updated_at:    String!
        closed_at:     String!
        body:          String!
        pull_request:  IssuePullRequest
    }
    
    type Label {
        url:   String!
        name:  String!
        color: String!
    }

    type IssuePullRequest {
        url:       String!
        html_url:  String!
        diff_url:  String!
        patch_url: String!
    }

    type Page {
        page_name: String
        title:     String
        action:    String
        sha:       String
        html_url:  String
    }

    type Repo {
        id:   Int
        name: String
        url:  String
    }

    type Actor {
        id:          Int
        login:       String
        gravatar_id: String
        url:         String
        avatar_url:  String
    }

    type Query {
        allData: [Record]!
    }
`


const resolvers = {
    Query: {
        allData: () => {
            return data
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server)
console.log(`Server starts at ${url}`)