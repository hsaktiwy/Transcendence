#include <iostream>
#include <vector>
#include <stack>

using namespace std;
class Solution {
public:

    typedef struct info{
        int v;
        int index;
    }_info;

    void poping_process(stack<_info>& s, vector<int>& heights,int & max_area, int i)
    {
        int borrow_index=i;
        while (!s.empty() && s.top().v > heights[i])
        {
            _info d = s.top();
            s.pop();
            int area = d.v * (i - d.index);
            if (max_area < area)
                max_area = area;
            borrow_index = d.index;
        }
        s.push({heights[i], borrow_index});
    }

    int largestRectangleArea(vector<int>& heights) {
        int max_area = 0;
        stack<_info> s;

        for (int i = 0; i < heights.size(); i++)
        {
            if (s.empty() || s.top().v < heights[i])
                s.push({heights[i], i});
            else if (!s.empty() && s.top().v > heights[i])
            {
                poping_process(s, heights,max_area, i);
            }
        }

        while (!s.empty())
        {
            _info d = s.top();
            s.pop();
            int area = d.v * (heights.size() - d.index);
            if (max_area < area)
                max_area = area;
        }
        return max_area;
    }
};

int main()
{
    int n;
    cin >> n; cin.ignore();
    vector <int> k;
    for (int i = 0; i < n; i++)
    {
        int v;
        cin >> v;cin.ignore();
        k.push_back(v);
    }
    Solution ss;
    cout << ss.largestRectangleArea(k) <<endl;
    return 0;
}