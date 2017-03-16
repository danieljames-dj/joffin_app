#include <iostream>
#include <string>

using namespace std;

string getNext(string s, int j) {
	string temp = "";
	for (int i = j, k = 0; i < s.length(); i++) {
		if (s[i] != '\t' && s[i] != '\0') {
			temp += s[i];
		} else {
			break;
		}
	}
	return temp;
}

int main() {
	int i;
	string s, query = "INSERT INTO questions values ", temp;
	getline(cin, s);
	while (s != "END") {
		query += "(";
		i = 0;
		temp = getNext(s, i); // setNo
		query += temp + ',';
		i += temp.length() + 1;
		temp = getNext(s, i); // qnNo
		query += temp + ',';
		i += temp.length() + 1;
		temp = "\"" + getNext(s, i) + "\""; // qn
		query += temp + ',';
		i += temp.length() - 1;
		temp = "\"" + getNext(s, i) + "\""; // optA
		query += temp + ',';
		i += temp.length() - 1;
		temp = "\"" + getNext(s, i) + "\""; // optB
		query += temp + ',';
		i += temp.length() - 1;
		temp = "\"" + getNext(s, i) + "\""; // optC
		query += temp + ',';
		i += temp.length() - 1;
		temp = "\"" + getNext(s, i) + "\""; // optD
		query += temp + ',';
		i += temp.length() - 1;
		temp = "\"" + getNext(s, i) + "\""; // ans
		query += temp;
		i += temp.length() - 1;
		query += "),";
		s = "";
		getline(cin, s);
	}
	query[query.length() - 1] = ';';
	cout << query;
	return 0;
}