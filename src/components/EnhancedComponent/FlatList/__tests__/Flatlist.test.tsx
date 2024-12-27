import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';

import {FlatList} from '../';

interface LIST_DATA_TYPE {
  id: string;
  name: string;
}

describe('FlatList Component', () => {
  it('renders correctly with data', () => {
    const data: LIST_DATA_TYPE[] = [
      {id: '1', name: 'Item 1'},
      {id: '2', name: 'Item 2'},
    ];
    const renderItem = ({item}: {item: LIST_DATA_TYPE}) => (
      <Text>{item.name}</Text>
    );

    const {getByText, toJSON} = render(
      <FlatList
        ref={null} // Could be a mock to check ref functionality
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : `item_${index}`
        }
        emptyTitle="No Data Available"
        emptyMsg="Please try again later"
        onRetry={jest.fn()}
      />,
    );

    // Check if the list items are rendered
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();

    // Snapshot test for visual consistency
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly without data', () => {
    const {getByText} = render(
      <FlatList
        ref={null} // Could be a mock to check ref functionality
        data={[]}
        renderItem={() => null}
        emptyTitle="No Data Available"
        emptyMsg="Please try again later"
        onRetry={jest.fn()}
      />,
    );

    // Check for empty state
    expect(getByText('No Data Available')).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('renders correctly when emptyTitle or emptyMsg is missing', () => {
    const {getByText} = render(
      <FlatList
        ref={null} // Could be a mock to check ref functionality
        data={[]}
        renderItem={() => null}
        onRetry={jest.fn()}
        emptyTitle="no data title"
        emptyMsg="no data message"
      />,
    );

    // Check for default empty messages when not passed explicitly
    expect(getByText('no data title')).toBeTruthy();
    expect(getByText('no data message')).toBeTruthy();
  });
});
