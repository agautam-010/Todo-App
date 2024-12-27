import React, {memo} from 'react';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {Image} from 'react-native';

import {TouchableOpacity, Typography, Row, Wrapper} from '@components';
import {THEME, ICONS} from '@utils';

import {TodoItemProps} from './types';
import {getDateTimeByTimeStamp} from './utils';
import styles from './styles';

// Memoized component for rendering a single Todo item
export default memo(
  ({
    item, // The current todo item
    onEdit, // Function to handle editing the todo
    onDelete, // Function to handle deleting the todo
    editId, // ID of the todo currently being edited
    setEditId, // Function to update the editId
    index, // Index of the current item in the list
    style, // Custom styles to apply
  }: TodoItemProps) => {
    const isEven = index % 2 === 0;
    return (
      <Wrapper style={[styles.todoItem, style]}>
        {/* Left Section: Circular Icon */}
        <Row style={styles.todoItemLeftWrap}>
          <Wrapper
            style={[
              styles.todoItemDot,
              isEven ? styles.evenItem : styles.oddItem,
            ]}>
            <MaterialIcons
              // Choose different icons for even and odd items
              name={isEven ? 'local-grocery-store' : 'monetization-on'}
              size={20}
              color={
                isEven
                  ? styles.evenItem.borderColor
                  : styles.oddItem.borderColor
              }
            />
          </Wrapper>

          {/* Text: Todo description and timestamp */}
          <Wrapper style={styles.todoTextWrap}>
            <Typography text={item.text} style={[styles.todoText]} />
            <Typography
              text={getDateTimeByTimeStamp(item.id)}
              style={[styles.todoText, styles.todoTimeStamp]}
            />
          </Wrapper>
        </Row>

        {/* Right Section: Edit and Delete Buttons */}
        <Row style={styles.todoItemRightWrap}>
          {/* Edit Button: Shown when the current item is not being edited */}
          {editId !== item.id && (
            <TouchableOpacity
              testID={`EDIT${index}`}
              onPress={() => onEdit(item)}
              style={styles.todoEditBtn}>
              <Ionicons
                name={'pencil'}
                size={24}
                color={styles.evenItem.borderColor}
              />
            </TouchableOpacity>
          )}

          {/* Cancel Edit Button: Shown when the current item is being edited */}
          {editId === item.id ? (
            <TouchableOpacity onPress={() => setEditId(null)}>
              <Image source={ICONS.EDIT_CANCEL} style={styles.cancelEditIcon} />
            </TouchableOpacity>
          ) : (
            // Delete Button: Shown when the current item is not being edited
            <TouchableOpacity
              onPress={() => onDelete(item)}
              testID={`REMOVE${index}`}>
              <Ionicons name={'trash'} size={24} color={THEME.COLORS.red} />
            </TouchableOpacity>
          )}
        </Row>
      </Wrapper>
    );
  },
);
